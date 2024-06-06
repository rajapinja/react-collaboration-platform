
import './App.css';
import ProfileForm from './routes/ProfileForm'
import Login from './routes/Login';
import Registration from './routes/Registration';
import ProfileList from './routes/ProfileList';
import JobListingForm from './routes/JobListingForm';
import JobList from './routes/JobListing';
import Matches from './routes/Matches';
import VideoCall from './routes/VideoCall';
function App() {
  return (
    <div className="App"> 
      <Registration/>
      <Login/>   
      <ProfileForm/>  
      <ProfileList/>  
      <JobListingForm/> 
      <JobList/>
      <Matches/>
      <VideoCall/>
    </div>
  );
  }

export default App;
