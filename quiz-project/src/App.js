import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Page1 from './pages/page1';
import Login from './pages/login';
import Signup from './pages/signup';
import Homepage from './pages/homepage';
import ChooseTopic from './pages/topicselect';
import SelectDifficulty from './pages/level';
import Quiz from './pages/quiz';
import ProfilePage from './pages/profile';
import UpdateProfile from './pages/update';
import UploadPhoto from './pages/change-photo';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Define routes for each page */}
        <Route path="/" element={<Page1 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/topicselect" element={<ChooseTopic />} />
        <Route path="/level" element={<SelectDifficulty />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/update" element={<UpdateProfile />} />
        <Route path="/change-photo" element={<UploadPhoto />} />
      </Routes>
    </Router>
  );
}

export default App;
