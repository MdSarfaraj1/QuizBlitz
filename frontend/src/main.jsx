import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, createRoutesFromElements, Route ,RouterProvider} from 'react-router-dom';
import Layout from './layout/MainLayout';
import Home from './pages/Home';
import './index.css';  // geenrate tailwind css file
import Login from './components/Login/Login';
import SignupForm from './components/SignUp/SignUpForm';
import Dashboard from './pages/Dashboard';
import StartQuiz from './components/StartQuiz/StartQuiz';
import RunningQuiz from './components/StartQuiz/RunningQuiz';
import ResultsPage from './components/StartQuiz/Result';
import UserSettings from './components/UserSettings/UserSettings';
import NotFound from './pages/NoFoundPage';
import { UserContextProvider } from './Context/UserContextProvider';
import ResetPassword from './components/ResetPassword/ResetPassword';
import ExploreQuizzes from './components/Home/ExploreQuizzes';
import { GoogleOAuthProvider } from '@react-oauth/google';
import JoinRoomPage from './components/Multiplayer/JoinRoomPage';
import MultiplayerQuiz from './components/Multiplayer/MultiplayerRunningQuiz';
import LiveQuiz from './components/Multiplayer/LiveRunningQuiz';
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
     <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
    </Route>
    <Route path='/dashboard/*' element={<Dashboard/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<SignupForm/>}/>
    <Route path='/startQuiz' element={<StartQuiz/>}/>
    <Route path='/runQuiz' element={<RunningQuiz/>}/>
    <Route path='quizResult' element={<ResultsPage/>}/>
    <Route path='/userSettings' element={<UserSettings/>}/>
    <Route path='/forget-password' element={<ResetPassword/>}/>
    <Route path='/exploreQuizzes' element={<ExploreQuizzes/>}/>
    <Route path="/joinRoom/:roomId" element={<JoinRoomPage />} />
     <Route path='/runningMultiplayerQuiz' element={<MultiplayerQuiz/>}/>
     <Route path='/liveQuiz' element={<LiveQuiz/>}/>

    <Route path='*' element={<NotFound/>}/>
    </>
   
  )
);

createRoot(document.getElementById('root')).render(
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
  <UserContextProvider>
    <RouterProvider router={router} />
  </UserContextProvider>
    </GoogleOAuthProvider>
  
)
