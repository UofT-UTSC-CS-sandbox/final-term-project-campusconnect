// src/components/Calendar.js
import React, { useState, useRef, useEffect } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import "./Calendar.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { green } from '@mui/material/colors';
 

const Calendar = () => {
    const calendarRef = useRef();
    const [events, setEvents] = useState([]); // Ensure events state is defined here

    //getting the tutor email from homepage
    const location = useLocation(); // Use useLocation hook
    const tutorEmail = location.state?.email; // Retrieve tutorEmail from state
    var isTutor = false;

    //console.log("Received tutorEmail in Feedback:", tutorEmail);

    const { user, isLoaded } = useUser(null);
    useEffect(() => {
        if (!isLoaded) {
            console.log("User not loaded");
            return;
        }
        if (!user) {
            console.log("User not found");
            return;
        }
        verifyUser();
    }, [user, isLoaded, tutorEmail]); // Added email dependency


    async function verifyUser() {
        if (String(user.primaryEmailAddress.emailAddress) === tutorEmail) {
            isTutor = true;
            
        }
        console.log("User is tutor and can edit: ", isTutor);
        //console.log("User email in Calendar:", user.primaryEmailAddress.emailAddress);
    }

    // here we can populate events from database to show on the calendar
    // sample data for now 
    useEffect(() => {
        const fetchEvents = async () => {
            // Simulate fetching events from an API
            const sampleEvents = [
                { id: 1, text: "Event 1", start: "2024-07-22T10:30:00", end: "2024-07-22T13:00:00", backColor: "#FF0000" },
                { id: 2, text: "Event 2", start: "2024-07-23T09:30:00", end: "2024-07-23T11:30:00" },
                { id: 3, text: "Event 3", start: "2024-07-24T12:00:00", end: "2024-07-24T14:00:00" }
            ];
            // Remove texts
            const eventsWithoutText = sampleEvents.map(event => ({ ...event, text: '' }));
            setEvents(eventsWithoutText);
            const dp = calendarRef.current.control;
            dp.update({ events: eventsWithoutText });
        };
        fetchEvents();
    }, []);

    
    const [config, setConfig] = useState({
        // what type we want viewable, can be changed to day as well
        viewType: "Week",
        durationBarVisible: false,
        timeRangeSelectedHandling: "Enabled",
        eventDeleteHandling: "Delete",
        eventClickHandling: "Update",
        eventMoveHandling: "Update",
        eventResizeHandling: "Update",
        // this function handles resizing an event
        onEventResized: async (args) => {
            if (!isTutor) return; // Prevent non-tutors from moving events
            const dp = calendarRef.current.control;
            const updatedEvent = { ...args.e.data, start: args.newStart, end: args.newEnd };
            setEvents(prevEvents => {
                const updatedEvents = prevEvents.map(event => event.id === args.e.id() ? updatedEvent : event);
                dp.update({ events: updatedEvents }); // Update the calendar with updated events
                return updatedEvents;
            });
            console.log("Event Resized:", updatedEvent);
        },
        

        // this function handles moving an event to a different time
        onEventMoved: async (args) => {
            if (!isTutor) return; // Prevent non-tutors from moving events
            const dp = calendarRef.current.control;
            const updatedEvent = { ...args.e.data, start: args.newStart, end: args.newEnd };
            setEvents(prevEvents => {
                const updatedEvents = prevEvents.map(event => event.id === args.e.id() ? updatedEvent : event);
                dp.update({ events: updatedEvents }); // Update the calendar with updated events
                return updatedEvents;
            });
            console.log("Event Moved:", updatedEvent);
        },

        // this function handles selecting a time range to create an event
        onTimeRangeSelected: (args) => {
            if (!isTutor) return; // Prevent non-tutors from moving events
            const dp = calendarRef.current.control;
            dp.clearSelection();
            const newEvent = {
                id: DayPilot.guid(),
                text: '',
                start: args.start,
                end: args.end,
                backColor: '#50C878' // colour used for the event
            };
            setEvents(prevEvents => {
                const updatedEvents = [...prevEvents, newEvent];
                dp.update({ events: updatedEvents }); // Update the calendar with new events
                return updatedEvents;
            });
            // console logs the event that was added
            console.log("Event Added:", newEvent);
        },
        // this function handles clicking on an event that was already created to edit it
        
        onEventDelete: (args) => {
            if (!isTutor) return; // Prevent non-tutors from moving events
            if (!window.confirm("Do you really want to delete this event?")) { return; }
            setEvents(prevEvents => {
                const updatedEvents = prevEvents.filter(event => event.id !== args.e.id());
                const dp = calendarRef.current.control;
                dp.events.remove(args.e);
                dp.update({ events: updatedEvents });
                console.log("Event Deleted:", args.e.data);
                return updatedEvents;
            });
        }
    });



    useEffect(() => {
        const startDate = "2024-07-22";
        calendarRef.current.control.update({ startDate, events });
    }, [events]);

    return (
        <div style={{ display: "flex" }}>
            <div style={{ marginRight: "10px" }}>
                <DayPilotNavigator
                    selectMode={"Week"}
                    // shows how many months are viewable at a time 
                    showMonths={3}
                    // skips 3 months ahead when pressing the next button
                    skipMonths={3}

                    onTimeRangeSelected={args => {
                        calendarRef.current.control.update({ startDate: args.day });
                    }}
                />
            </div>
            <div style={{ flexGrow: 1 }}>
                <DayPilotCalendar {...config} ref={calendarRef} />
            </div>
        </div>
    );
};


export default Calendar;
