import Nav from './Nav';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AttendConferenceForm from './AttendConferenceForm';
import ConferenceForm from './ConferenceForm';
import AttendeesList from './AttendeesList';
import LocationForm from './LocationForm';
import PresentationForm from './PresentationForm';


function App(props) {
  if (props.attendees === undefined) {
    return null;
  }

  return (
    <>
      <BrowserRouter>
        <Nav />
        <div className="container">
          <Routes>
            <Route path="locations">
              <Route path="new" element={<LocationForm />} />
            </Route>
            <Route path="conferences">
              <Route path="new" element={<ConferenceForm />} />
            </Route>
            <Route path="attendees">
              <Route path="" element={<AttendeesList attendees={props.attendees} />} />
              <Route path="new" element={<AttendConferenceForm />} />
            </Route>
            <Route path="presentations">
              <Route path="new" element={<PresentationForm />} />
            </Route>
          </Routes>
        </div>
      </BrowserRouter>
    </>


  );
}

export default App;


{/* <AttendeeForm /> */ }
{/* <ConferenceForm /> */ }
{/* <LocationForm /> */ }
{/* <AttendeesList attendees={props.attendees} /> */ }
