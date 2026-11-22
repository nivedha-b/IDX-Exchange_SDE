import logo from './logo.svg';
import './App.css';
import ListingsPage from "./pages/ListingsPage";
import PropertyDetailPage from './pages/PropertyDetailPage';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListingsPage />} />
        <Route path="/property/:id" element={<PropertyDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
