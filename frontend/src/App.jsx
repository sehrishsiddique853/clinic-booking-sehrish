import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import PatientDashboard from "./pages/PatientDashboard";
import MyAppointments from "./pages/MyAppointments";
import ManageAppointments from "./pages/ManageAppointments";
import ManageDoctors from "./pages/ManageDoctors";
import UpdateDoctor from "./pages/UpdateDoctor";
import UpdateSlot from "./pages/ManageSlot";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route    path="/" element={<Register />}   />
         <Route    path="/login" element={<Login />}   />
         <Route path="/patient" element={<PatientDashboard/>}/>
      <Route path="/my-appointments" element={<MyAppointments />}/>
<Route path="/manage-appointments" element={<ManageAppointments />}/>
<Route path="/manage-doctors" element={<ManageDoctors />}/>
      <Route path="/update-doctor/:id" element={<UpdateDoctor />}/>
     <Route path="/manage-slots/:id" element={<UpdateSlot />}/>
      </Routes>

    </BrowserRouter>
  );

}

export default App;