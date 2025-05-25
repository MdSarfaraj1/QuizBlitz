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
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
     <Route element={<Layout />}>
      <Route path="/" element={<Home />} />
    </Route>
    <Route path='/dashboard' element={<Dashboard/>}/>
    <Route path='/login' element={<Login/>}/>
    <Route path='/signup' element={<SignupForm/>}/>
    <Route path='/startQuiz' element={<StartQuiz/>}/>
    <Route path='/runningQuiz' element={<RunningQuiz/>}/>
    <Route path='quizResult' element={<ResultsPage/>}/>
    </>
   
  )
);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
