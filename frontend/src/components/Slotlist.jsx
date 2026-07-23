function SlotList({

    doctorId,
    slots,
    bookAppointment

}) {

    return (

        <>

            {

                slots.map(slot => (

                    <div
                        key={slot.id}
                        className="card"
                    >

                        <p>
                            {new Date(slot.date).toLocaleDateString()}
                        </p>

                        <p>{slot.time}</p>

                        <button
                            onClick={() =>
                                bookAppointment(
                                    doctorId,
                                    slot.id
                                )
                            }
                        >
                            Book
                        </button>

                    </div>

                ))

            }

        </>

    );

}

export default SlotList;
