//patient appotment display

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function MyAppointments() {

    const [appointments, setAppointments] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {

        getAppointments();

    }, []);


    const getAppointments = async () => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.get(
                "/appointments/my",
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


    const cancelAppointment = async (id) => {

        try {

            const token = localStorage.getItem("token");

            const res = await api.delete(
                `/appointments/${id}`,
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

            <button
                onClick={() => navigate("/patient")}
            >
                Back
            </button>

            <h2>My Appointments</h2>

            {appointments.length === 0 ? (

                <p>No Appointments</p>

            ) : (

                appointments.map(app => (
                    
                    <div className="card" key={app.id}>
                
                        <h4>{app.name}</h4>

                       <p>
  {new Date(app.date).toLocaleDateString()}
</p>

                        <p>{app.time}</p>

                        <p>Status: {app.status}</p>

                        {app.status.toLowerCase() === "pending" && (

                            <button
                                onClick={() =>
                                    cancelAppointment(app.id)
                                }
                            >
                                Cancel
                            </button>

                        )}

                    </div>

                ))

            )}

        </div>

    );

}

export default MyAppointments;