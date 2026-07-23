import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function UpdateDoctor() {

    const { id } = useParams();

    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [info, setInfo] = useState("");

    useEffect(() => {

        getDoctor();

    }, []);

    // Function to fetch doctor details by ID
    const getDoctor = async () => {

        try {

            const res = await api.get(`/doctors/${id}`);

            setName(res.data.name);
            setSpecialization(res.data.specialization);
            setInfo(res.data.info);

        } catch (err) {

            console.log(err);

        }

    };

    // Function to update doctor details
    const updateDoctor = async (e) => {

        e.preventDefault();

        try {

            const token = localStorage.getItem("token");

            const res = await api.put(
                `/doctors/${id}`,
                {
                    name,
                    specialization,
                    info
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );

            alert(res.data.message);

            navigate("/manage-doctors");

        } catch (err) {

            alert(err.response?.data?.message);

        }

    };

    return (

        <div className="container">

            <button
                onClick={() => navigate("/manage-doctors")}
            >
                Back
            </button>

            <h2>Update Doctor</h2>
              {/* submit form */}
            <form onSubmit={updateDoctor}>
                <p>Name:</p>
                <input
                type="text"
                    value={name}
                    onChange={(e) =>
                        setName(e.target.value)
                    }
                />
    <p>Specialization:</p>
                <input
                type="text"
                    value={specialization}
                    onChange={(e) =>
                        setSpecialization(e.target.value)
                    }
                />
    <p>Info:</p>
                <input
                    value={info}
                    onChange={(e) =>
                        setInfo(e.target.value)
                    }
                />

                <button>

                    Update Doctor

                </button>

            </form>

        </div>

    );

}

export default UpdateDoctor;