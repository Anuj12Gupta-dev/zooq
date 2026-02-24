import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import PublicRoute from "./components/publicRoute";
import ProtectedRoute from "./components/protectedRoute";
import SelectRole from "./pages/selectRole";
import Account from "./pages/Account";
import Navbar from "./components/navbar";

function App() {
  return (
    <>  
      <BrowserRouter>
      <Navbar/>
        <Routes>
          <Route element={<PublicRoute />}>
            <Route path="/login" element={<Login />} />
          </Route>
          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Home />} />
            <Route path="/select-role" element={<SelectRole />} />
            <Route path="/account" element={<Account />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster/>
    </>
  );
}

export default App;
