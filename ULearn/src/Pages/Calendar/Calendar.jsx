// src/components/Calendar.js
import React, { useState, useRef, useEffect } from 'react';
import { DayPilot, DayPilotCalendar, DayPilotNavigator } from "@daypilot/daypilot-lite-react";
import "./Calendar.css";
import { useLocation, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import Nav from "../../components/Nav/Nav.jsx";
import axios from 'axios';
 

const Calendar = () => {
    const calendarRef = useRef();
    const [events, setEvents] = useState([]); // Ensure events state is defined here

    //getting the tutor email from homepage
    const location = useLocation(); // Use useLocation hook
    const tutorEmail = location.state?.email; // Retrieve tutorEmail from state
    const tutorname = location.state?.name;
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
    }


    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        try {
            const response = await axios.get(`http://localhost:3001/availability/${tutorEmail}`);
            const availableTimes = response.data;

            console.log("Available Times fetched:", availableTimes);
            // Add color to the events
            const eventsWithColour = availableTimes.map(event => ({
                id: event.eventID,
                start: formatDateForDayPilot(event.startTime),
                end: formatDateForDayPilot(event.endTime),
                backColor: 'rgb(22, 86, 166)'
            }));

            setEvents(eventsWithColour);
            console.log("Events fetched:", eventsWithColour);

            const dp = calendarRef.current.control;
            console.log("dp", dp);
            dp.update({ events: eventsWithColour });
        } catch (error) {
            console.error('Error fetching events:', error);
        }
    };

    const formatDateForDayPilot = (date) => {
        const d = new Date(date);
        const pad = (num) => (num < 10 ? '0' + num : num);
    
        return (
            d.getFullYear() +
            '-' +
            pad(d.getMonth() + 1) +
            '-' +
            pad(d.getDate()) +
            'T' +
            pad(d.getHours()) +
            ':' +
            pad(d.getMinutes()) +
            ':' +
            pad(d.getSeconds())
        );
    };

    
    const [config, setConfig] = useState({
        // what type we want viewable, can be changed to day as well
        viewType: "Week",
        durationBarVisible: false,
        timeRangeSelectedHandling: "Enabled",
        eventDeleteHandling: "Delete",
        eventClickHandling: "Update",
        eventMoveHandling: "Update",
        eventResizeHandling: "Update",
        cellHeight: 23,
        
        // this function handles resizing an event
        onEventResized: async (args) => {
            if (user.primaryEmailAddress != tutorEmail ) return; // Prevent non-tutors from moving events
            const updatedEvent = { ...args.e.data, start: args.newStart, end: args.newEnd };

            try {
                // Send a request to the backend to update the event
                const response = await axios.put(`http://localhost:3001/availability/${tutorEmail}/${args.e.id()}`, {
                    newStart: args.newStart.value,
                    newEnd: args.newEnd.value
                });
        
                if (response.status === 200) {
                    setEvents(prevEvents => {
                        const updatedEvents = prevEvents.map(event => event.id === args.e.id() ? updatedEvent : event);
                        const dp = calendarRef.current.control;
                        dp.update({ events: updatedEvents }); // Update the calendar with updated events
                        console.log("Event resized:", updatedEvent);
                        return updatedEvents;
                    });
                } else {
                    console.error('Error updating event:', response.data);
                }
            } catch (error) {
                console.error('Error updating event:', error);
            }
            console.log("Event Resized:", updatedEvent);
        },
        

        // this function handles moving an event to a different time
        onEventMoved: async (args) => {
            if (user.primaryEmailAddress != tutorEmail) return; // Prevent non-tutors from moving events
            
            const updatedEvent = { ...args.e.data, start: args.newStart, end: args.newEnd };

            try {
                // Send a request to the backend to update the event
                const response = await axios.put(`http://localhost:3001/availability/${tutorEmail}/${args.e.id()}`, {
                    newStart: args.newStart.value,
                    newEnd: args.newEnd.value
                });
        
                if (response.status === 200) {
                    setEvents(prevEvents => {
                        const updatedEvents = prevEvents.map(event => event.id === args.e.id() ? updatedEvent : event);
                        const dp = calendarRef.current.control;
                        dp.update({ events: updatedEvents }); // Update the calendar with updated events
                        console.log("Event Moved:", updatedEvent);
                        return updatedEvents;
                    });
                } else {
                    console.error('Error updating event:', response.data);
                }
            } catch (error) {
                console.error('Error updating event:', error);
            }
            console.log("Event Moved:", updatedEvent);
        },

        // this function handles adding a time range to create an event
        onTimeRangeSelected: async (args) => {
            if (user.primaryEmailAddress != tutorEmail) {return}; // Prevent non-tutors from moving events
            const dp = calendarRef.current.control;
            dp.clearSelection();
            const newEvent = {
                id: DayPilot.guid(),
                start: args.start.value,
                end: args.end.value,
                backColor: 'rgb(22, 86, 166)' // colour used for the event
            };
            setEvents(prevEvents => {
                const updatedEvents = [...prevEvents, newEvent];
                dp.update({ events: updatedEvents }); // Update the calendar with new events
                return updatedEvents;
            });
            console.log("Event Added:", {
                id: newEvent.id,
                text: newEvent.text,
                start: newEvent.start.toString(), // convert to string for better readability in console
                end: newEvent.end.toString(), // convert to string for better readability in console
                
            })

            const newEventAdded = {
                tutorEmail: tutorEmail, // tutor email 
                eventID: newEvent.id,
                startTime: formatDateForDayPilot(args.start.value), // convert to string for better readability in console
                endTime: formatDateForDayPilot(args.end.value), // convert to string for better readability in console

            };

            try {
                console.log(newEventAdded);
                const response = await axios.post('http://localhost:3001/availability', newEventAdded);
                console.log('Availability submitted:', response.data);
            } catch (error) {
                console.error('Error submitting Availability:', error);
            }

                const start = new Date(newEvent.start);
                console.log(start); // Outputs: Thu Jul 25 2024 11:00:00 GMT+0000 (Coordinated Universal Time)

        },
        // this function handles clicking on an event that was already created to edit it
        
        onEventDelete: async (args) => {
            if (!isTutor) return; // Prevent non-tutors from moving events
            if (!window.confirm("Do you really want to delete this event?")) { return; }
            try {
                // Send a request to the backend to delete the event
                const response = await axios.delete(`http://localhost:3001/availability/${tutorEmail}/${args.e.id()}`);
        
                if (response.status === 200) {
                    setEvents(prevEvents => {
                        const updatedEvents = prevEvents.filter(event => event.id !== args.e.id());
                        const dp = calendarRef.current.control;
                        dp.events.remove(args.e);
                        dp.update({ events: updatedEvents });
                        console.log("Event Deleted:", args.e.data);
                        return updatedEvents;
                    });
                } else {
                    console.error('Error deleting event:', response.data);
                }
            } catch (error) {
                console.error('Error deleting event:', error);
            }

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

    return (
        <>
        <Nav/>
        <h1 style={{ fontSize: '48px', textAlign: 'center', marginTop: '10px' }}>
            {tutorname}'s Calendar
        </h1>
        <div style={{ display: "flex", marginTop: '10px' }}>
            <div style={{ marginRight: "10px" }}>
                <DayPilotNavigator
                    selectMode={"Week"}
                    // shows how many months are viewable at a time 
                    showMonths={2}
                    // skips 3 months ahead when pressing the next button
                    skipMonths={2}
                    onTimeRangeSelected={args => {
                        calendarRef.current.control.update({ startDate: args.day });
                    }}
                />
            </div>
            <div >
                <DayPilotCalendar {...config} ref={calendarRef} />
            </div>
        </div>
        </>
    );
};


export default Calendar;
