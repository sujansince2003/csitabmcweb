import React from 'react'
import { FaChalkboardTeacher } from "react-icons/fa";
import { AiOutlineClockCircle } from "react-icons/ai";
import { MdDateRange } from "react-icons/md";
import { GrLocation } from "react-icons/gr";
import './Quick.css'
import Tags from './Tags/Tags';

const QuickDetails = ({ event }) => {


  return (
    <>
      <div className="bg-div">
        <div className="upper-div">
          <div className="imgdiv">
            <img
              src={event.Banner}
              className="img"
              alt={event.Name}
            />
          </div>

          <div className="event">
            <h4 className="event-title">{event.Name}</h4>

            <div>
              <div className="event-details">
               <MdDateRange className='icon'/>
                <h4 className="event-ide">{event.Date}</h4>
              </div>
              <div className="event-details">
               <AiOutlineClockCircle className='icon'/>
                <h4 className="event-ide">{event.time}</h4>
              </div>
              <div className="event-details">
               
               <GrLocation className='icon'/>
                <h4 className="event-ide">{event.location}</h4>
              </div>
            </div>

            <Tags tags={event.tags}/>

            <hr className="hr-line" />

            <div className="mentor">
              <div className="">
                <div className="mentortxt">
                  <FaChalkboardTeacher className='mentoricon' />
                  <span>Mentor</span>
                </div>
                <div className="mentorname">
                  <img
                    src={event.mentor.photoUrl}
                    className="mentorimg"
                    alt={event.mentor.name}
                  />

                  <div>
                    <b>{event.mentor.name}</b>
                    <p>{event.mentor.post}</p>
                  </div>
                </div>
              </div>

              <div>
                <span className="attendees">Attendees :</span>
                <p className="attendeesname">
                  Sanchit Pandey, Bipin Khatri,<br/> Sujan Khatri,{" "}
                  <span
                    className="attendeesnamehover"
                    title={event.attendees.listOfAttendees}>

                    {event.attendees.numberOfAttendees} others

                  </span>{" "}
                </p>
              </div>
            </div>

            <hr className="hr-line" />

            <div className="wholesummary">
              <h2 className="event-summary-title">Event Summary</h2>
              <p className="event-summary-text">
                {event.summary}{" "}
              </p>
            </div>

            <div className="button">
              <a href={event.registrationUrl}>Register Now</a>
            </div>
          </div>
        </div>
      </div>

    </>
  )
}

export default QuickDetails