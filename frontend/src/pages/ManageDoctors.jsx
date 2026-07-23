import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

function ManageDoctors() {

    const [doctors, setDoctors] = useState([]);

    const [name, setName] = useState("");
    const [specialization, setSpecialization] = useState("");
    const [info, setInfo] = useState("");
    const [slots, setSlots] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        getDoctors();
        getslots();
    }, []);
    

   const getDoctors = async () => {

    try {

        const res = await api.get("/doctors");

        setDoctors(res.data);

    } catch (err) {

        console.log(err);

    }

};
  
    const getslots = async () => {
        try{
       const res = await api.get("/slots");
       setSlots(res.data);
        }catch(err){
            console.log(err);
        }
    }

   const addDoctor = async (e) => {

    e.preventDefault();

    try {

        const token = localStorage.getItem("token");

        await api.post(
            "/doctors",
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

        setName("");
        setSpecialization("");
        setInfo("");

        getDoctors();

    } catch (err) {

        alert(err.response?.data?.message || "Something went wrong");

    }

};

    const deleteDoctor = async (id) => {

        const token = localStorage.getItem("token");

        await api.delete(
            `/doctors/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );

        getDoctors();

    };

    return (

        <div className="container">

            

            <button
                onClick={() => navigate("/manage-appointments")}
            >
                back
            </button>

          
            <h2>Manage Doctors</h2>

            <form onSubmit={addDoctor}>

                <input
                    placeholder="Name"
                    value={name}
                    onChange={(e)=>setName(e.target.value)}
                />

                <input
                    placeholder="Specialization"
                    value={specialization}
                    onChange={(e)=>setSpecialization(e.target.value)}
                />

                <input
                    placeholder="Info"
                    value={info}
                    onChange={(e)=>setInfo(e.target.value)}
                />

                <button>
                    Add Doctor
                </button>

            </form>

            <hr />

            {

                doctors.map(doctor=>(

                    <div
                        className="card"
                        key={doctor.id}
                    >

                        <h4>{doctor.name}</h4>

                        <p>{doctor.specialization}</p>
                        <p>{doctor.info}</p>
                        <h5>Slots</h5>

                        {slots.filter(slot=>slot.doctor_id === doctor.id).map(slot=>(

                            <div className="card" key={slot.id}>
                                <p>{new Date(slot.date).toLocaleDateString()}</p>
                                <p>{slot.time}</p>
                            </div>

                        ))}

                        <button
                            onClick={()=>
                            deleteDoctor(doctor.id)}
                        >
                            Delete
                        </button>

                        <button
                            onClick={()=>
                           navigate(`/update-doctor/${doctor.id}`)}
                        >
                            Update
                        </button>

                        <button
                            onClick={()=>
                           navigate(`/manage-slots/${doctor.id}`)}
                        >
                            Manage Slots
                        </button>

                    </div>

                ))

            }

        </div>

    );

}

export default ManageDoctors;