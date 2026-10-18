const express = require("express");
const router = express.Router();
const pool = require("../db.js")

// GET properties (/api/properties)
router.get("/", async (req, res) => {
    try {
        const limit = req.query.limit !== undefined ? Number(req.query.limit) : 20;
        const offset = req.query.offset !== undefined ? Number(req.query.offset) : 0;
        const {
            city,
            zipcode,
            minPrice,
            maxPrice,
            beds,
            baths
        } = req.query;


        // input validation
        if (minPrice !== undefined && (isNaN(Number(minPrice)) || minPrice < 0)) {
            return res.status(400).json({
                error: "minPrice must be a non-negative number"
            });
        }

        if (maxPrice !== undefined && (isNaN(Number(maxPrice)) || maxPrice < 0)) {
            return res.status(400).json({
                error: "maxPrice must be a non-negative number"
            });
        }

        if (minPrice !== undefined && maxPrice !== undefined && minPrice > maxPrice) {
            return res.status(400).json({
                error: "minPrice must be less than or equal to maxPrice"
            });
        }

        if(zipcode !== undefined && zipcode.trim() === "") {
            return res.status(400).json({
                error: "zipcode cannot be empty"
            });
        }

        if(city !== undefined && city.trim() === "") {
            return res.status(400).json({
                error: "city cannot be empty"
            });
        }

        if(limit !== undefined && (!Number.isInteger(Number(limit)) || limit < 1 || limit > 100)) {
            return res.status(400).json({
                error: "limit must be an integer between 1 and 100"
            });
        }

        if(offset !== undefined && (!Number.isInteger(Number(offset)) || offset < 0)) {
            return res.status(400).json({
                error: "offset must be a non-negative integer"
            });
        }

        if(beds !== undefined && (!Number.isInteger(Number(beds)) || beds < 0)){
            return res.status(400).json({
                error: "beds must be a non-negative integer"
            });
        }

        if(baths !== undefined && (isNaN(Number(baths)) || baths < 0)) {
            return res.status(400).json({
                error: "baths must be a non-negative number"
            });
        }


        // filtering
        const conditions = [];
        const values = [];

        if(city) {
            conditions.push("LOWER(TRIM(L_City)) = LOWER(TRIM(?))");
            values.push(city);
        }

        if(zipcode) {
            conditions.push("L_Zip = ?");
            values.push(zipcode);
        }

        if(minPrice) {
            conditions.push("L_SystemPrice >= ?");
            values.push(Number(minPrice));
        }

        if(maxPrice) {
            conditions.push("L_SystemPrice <= ?");
            values.push(Number(maxPrice));
        }

        if(beds) {
            conditions.push("L_Keyword2 = ?");
            values.push(Number(beds));
        }

        if(baths) {
            conditions.push("LM_Dec_3 = ?");
            values.push(Number(baths));
        }


        // dynamic where clause
        let whereClause = "";
        if(conditions.length > 0) {
            whereClause = " WHERE " + conditions.join(" AND ");
        }
       

        // query properties
        const queryValues = [...values, limit, offset]
        const [rows] = await pool.query(
            "SELECT * FROM rets_property" +
            whereClause +
            " LIMIT ? OFFSET ?",
            queryValues
        );

        // get total count of properties
        const countQuery = "SELECT COUNT(*) AS total FROM rets_property" + whereClause;
        const [countRows] = await pool.query(
            countQuery,
            values
        );

        // show results
        res.json({
            total: countRows[0].total,
            limit,
            offset,
            results: rows
        });

    } catch(error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to retrieve properties"
        });
    }
});

// Test Case:
// SELECT COUNT(*) 
// FROM rets_property 
// WHERE L_SystemPrice >= 300000 AND L_Keyword2 = 3;
// returns total = 17993


// GET /api/properties/:id/openhouses
router.get("/:id/openhouses", async (req, res) => {
    try {
        const id = req.params.id;

        // validate id
        if(!id || id.trim() === "") {
            return res.status(400).json({
                error: "Listing ID is required"
            });
        }

        if(id.length > 255) {
            return res.status(400).json({
                error: "Listing ID is too long"
            });
        }

        // query properties by id to check if property exists
        const [rows] = await pool.query(
            "SELECT * FROM rets_property WHERE L_ListingID = ?",
            [id]
        );

        // check if property exists, query rets_openhouse if it does, else show 404 
        if(rows.length > 0) {
            const [openHouseRows] = await pool.query(
                "SELECT * FROM rets_openhouse WHERE L_ListingID = ? ORDER BY OpenHouseDate, OH_StartTime",
                [id]
            )
            res.json(openHouseRows);
        } else {
            res.status(404).json({
                error: "Unknown Listing ID"
            });
        }

    } catch(error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to retrieve open houses"
        });
    }
});


// GET /api/properties/:id
router.get("/:id", async (req, res) => {
    try {
        const id = req.params.id;


        // validate id
        if(!id || id.trim() === "") {
            return res.status(400).json({
                error: "Listing ID is required"
            });
        }

        if(id.length > 255) {
            return res.status(400).json({
                error: "Listing ID is too long"
            });
        }

        // query properties by id
        const [rows] = await pool.query(
            "SELECT * FROM rets_property WHERE L_ListingID = ?",
            [id]
        );

        // show results if rows is not empty, 404 if nothing was found
        if(rows.length > 0) {
            res.json(rows[0]);
        } else {
            res.status(404).json({
                error: "Unknown Listing ID"
            });
        }

    } catch(error) {
        console.error(error);
        res.status(500).json({
            error: "Failed to retrieve properties"
        });
    }
});

module.exports = router;