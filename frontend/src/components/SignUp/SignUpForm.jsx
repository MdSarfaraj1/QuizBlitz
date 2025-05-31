import Logo from "../Login/Logo";
import SignUpInputField from "./SignUpInputField";
const SignUpForm = () => {
  return(
    <div className=" flex h-screen flex-col md:flex-row w-full">
      <div className=" h- flex flex-col justify-center items-center shadow-md bg-gradient-to-br from-indigo-100 via-white to-purple-200 px-4 py-1 sm:p-6 md:w-1/2 lg:w-5/12"> 
      <Logo/>
        <div className="w-full max-w-md mt-3">
          <div className="bg-slate-100 shadow-xl rounded-2xl p-6 sm:p-8">
              
            <SignUpInputField/>
          </div>
        </div>
      </div>
      <div className="hidden md:block md:w-1/2 lg:w-7/12 illustration-signup-area relative">
        <div className="absolute inset-0 z-10 flex items-center h-screen justify-center ml-12  ">
          <div className="w-full max-w-md text-white ">
            <h2 className="text-4xl font-bold mb-4">Join  <span className="text-4xl font-bold tracking-tight text-green-600"> Quiz
                <span className="text-quizDashboard-accent">Blitz</span>
              </span> 
            </h2>
            <p className="text-lg opacity-90"> Become part of the QuizBlitz community and expand your knowledge through exciting quizzes!</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default SignUpForm;