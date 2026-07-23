import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";


function ManageAppointments() {

    const [appointments, setAppointments] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getAppointments();
    }, []);

    const getAppointments = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get(
                "/appointments",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            setAppointments(res.data);

        } catch (err) {

            console.log(err);

        }

    };

    const confirmAppointment = async (id) => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.patch(
                `/appointments/${id}/confirm`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(res.data.message);

            getAppointments();

        } catch (err) {

            alert(err.response.data.message);

        }

    };

    const cancelAppointment = async (id) => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.patch(
                `/appointments/${id}/cancel`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(res.data.message);

            getAppointments();

        } catch (err) {

            alert(err.response.data.message);

        }

    };

    return (

        <div className="container">

            <button onClick={() => navigate("/login")}>
                Back
            </button>


            <h2>Manage Appointments</h2>

            <button
        onClick={() => navigate("/manage-doctors")}
        style={{ marginLeft: "10px" }}
    >
        Manage Doctors
    </button>

            {appointments.length === 0 ? (

                <p>No Appointments</p>

            ) : (

                appointments.map(app => (

                    <div className="card" key={app.id}>

                        <h4>{app.patient}</h4>

                        <p>{app.doctor}</p>

                        <p>{new Date(app.date).toLocaleDateString()}</p>

                        <p>{app.time}</p>

                        <p>Status: {app.status}</p>

                        {app.status.toLowerCase() === "pending" && (

                            <>
                                <button
                                    onClick={() => confirmAppointment(app.id)}
                                >
                                    Confirm
                                </button>

                                <button
                                    onClick={() => cancelAppointment(app.id)}
                                >
                                    Cancel
                                </button>
                            </>

                        )}

                    </div>

                ))

            )}

        </div>

    );

}

export default ManageAppointments;