import SignUpInputField from "./SignUpInputField";

const SignUpForm = () => {
    return(
        <div className="min-h-screen flex flex-col justify-center items-center shadow-md bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4 sm:p-6">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-secondary text-[#7c3bed] ">
              Quiz Vault
            </h1>
            <p className="text-gray-500 mt-2">Test your knowledge</p>
          </div>
          
          <div className="bg-white shadow-xl rounded-2xl p-6 sm:p-8">
            <SignUpInputField/>
          </div>
          
          <div className="text-center mt-8">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Quiz Vault. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    )
}
export default SignUpForm;