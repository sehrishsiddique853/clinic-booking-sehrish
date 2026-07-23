import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import DoctorCard from "../components/DoctorCard";

function PatientDashboard() {

    const [doctors, setDoctors] = useState([]);
    const [slots, setSlots] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState(null);

    const navigate = useNavigate();

    useEffect(() => {
        getDoctors();
    }, []);

    const getDoctors = async () => {

        try {

            const res = await api.get("/doctors");

            setDoctors(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const getSlots = async (doctorId) => {

        try {

            const res = await api.get("/slots");

            const doctorSlots = res.data.filter(
                slot => slot.doctor_id === doctorId
            );

            setSlots(doctorSlots);
            setSelectedDoctor(doctorId);

        } catch (err) {

            console.log(err);

        }

    };

    const bookAppointment = async (doctorId, slotId) => {

        try {

            const res = await api.post("/appointments", {
                doctor_id: doctorId,
                slot_id: slotId
            });

            alert(res.data.message);

            getSlots(doctorId);

        } catch (err) {

            alert(err.response?.data?.message);

        }

    };

    return (

        <div className="container">

            <h2>Patient Dashboard</h2>

            <h3>
                Welcome {localStorage.getItem("name")}
            </h3>

            <button
                onClick={() => navigate("/my-appointments")}
            >
                My Appointments
            </button>

            <hr />

            {

                doctors.map(doctor => (

                    <DoctorCard
                        key={doctor.id}
                        doctor={doctor}
                        slots={slots}
                        selectedDoctor={selectedDoctor}
                        getSlots={getSlots}
                        bookAppointment={bookAppointment}
                    />

                ))

            }

        </div>

    );

}

export default PatientDashboard;