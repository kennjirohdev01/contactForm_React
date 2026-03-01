import {BrowserRouter,Routes,Route} from "react-router-dom";
import ContactForm from "./ContactForm.jsx";
import Admin from "./Admin.jsx";
import Complete from "./Complete.jsx";

function App(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ContactForm />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/complete" element={<Complete />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
