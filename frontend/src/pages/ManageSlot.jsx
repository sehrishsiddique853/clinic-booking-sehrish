import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function ManageSlots() {

    const { id } = useParams();

    const [doctor, setDoctor] = useState({});
    const [slots, setSlots] = useState([]);

    const [date, setDate] = useState("");
    const [time, setTime] = useState("");

    const navigate = useNavigate();

    useEffect(() => {

        if (id) {
            getDoctor();
            getSlots();
        }

    }, [id]);

    const getDoctor = async () => {

        try {

            const res = await api.get(`/doctors/${id}`);
            setDoctor(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const getSlots = async () => {

        try {

            const res = await api.get(`/slots/${id}`);

            setSlots(res.data);

        } catch (err) {

            console.log(err);
        }

    };

    const addSlot = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            await api.post(
                "/slots",
                {
                    doctor_id: id,
                    date,
                    time
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setDate("");
            setTime("");
            getSlots();

        } catch (err) {

            alert(err.response?.data?.message || "Something went wrong");

        }

    };

    const deleteSlot = async (slotId) => {

        try {

            const token = localStorage.getItem("token");

            await api.delete(`/slots/${slotId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });

            getSlots();

        } catch (err) {

            alert(err.response?.data?.message || "Something went wrong");

        }

    };

    return (

        <div className="container">

            <button
                onClick={() => navigate("/manage-doctors")}
            >
                Back
            </button>

            <h2>Manage Slots</h2>

            <h3>{doctor.name}</h3>

            <form onSubmit={addSlot}>

                <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />

                <input
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                />

                <button>
                    Add Slot
                </button>

            </form>

            <hr />
            <h4>Slots</h4>

            {slots.length === 0 ? (
                <p>No slots yet.</p>
            ) : (
                slots.map(slot => (
                    <div className="card" key={slot.id}>
                        <p>{new Date(slot.date).toLocaleDateString()}</p>
                        <p>{slot.time}</p>
                        <p>{slot.is_booked ? "Booked" : "Available"}</p>
                        <button onClick={() => deleteSlot(slot.id)}>Delete</button>
                    </div>
                ))
            )}

        </div>

    );

}

export default ManageSlots;