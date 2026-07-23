import SlotList from "./SlotList";

function DoctorCard({

    doctor,
    slots,
    selectedDoctor,
    getSlots,
    bookAppointment

}) {

    return (

        <div className="card">

            <h4>{doctor.name}</h4>

            <p>{doctor.specialization}</p>

            <p>{doctor.info}</p>

            <button
                onClick={() => getSlots(doctor.id)}
            >
                View Slots
            </button>

            {

                selectedDoctor === doctor.id && (

                    <SlotList
                        doctorId={doctor.id}
                        slots={slots}
                        bookAppointment={bookAppointment}
                    />

                )

            }

        </div>

    );

}

export default DoctorCard;