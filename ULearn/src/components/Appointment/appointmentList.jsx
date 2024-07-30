import React, { useEffect, useState } from 'react';
import Appointment from "./appointment.jsx"
import AppointmentCard from './appointmentCard.jsx';

const AppointmentList = ( props ) => {
    const [openAppointment, setOpenAppointment] = useState();

    const handleClick = (e, appointment) => {
        e.preventDefault();
        setOpenAppointment(appointment);
    };

    return (
        <div className="appointments-container">
            {console.log(props.appointments.length)}
            {props.appointments.length > 0 ? (
                props.appointments.map(appointment => (
                    <div key={appointment._id} className="appointment-post">
                        <Appointment
                            name = {appointment.name} 
                            image = {appointment.image}
                            topic = {appointment.topic}
                            desc = {appointment.description}
                            starttime = {appointment.starttime}
                            endtime = {appointment.endtime}
                            onClick={e => handleClick(e, appointment)}
                        >
                        </Appointment>
                        <AppointmentCard className='hidden' openApp={openAppointment || null}/>
                    </div>
                ))
            ) : (
                <p>No appointments yet.</p>
            )}
        </div>
    );
};

export default AppointmentList;
