import { BrowserRouter, Routes, Route } from "react-router-dom";
import ContactForm from "./ContactForm.jsx";
import Admin from "./Admin.jsx";
import Complete from "./Complete.jsx";
import Login from "./Login.jsx";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactForm />} />
        <Route path="/complete" element={<Complete />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
