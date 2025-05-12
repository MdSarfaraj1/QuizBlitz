import { useParams } from "react-router-dom";
import LoginPage from "../components/Login/Login";
const Login_SignUp = () => {
    let type=useParams();
  return (
  <div className=" flex justify-center">
    <div className="flex items-center justify-center gap-2">
      <div className="h-8 w-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-lg">Q</span>
      </div>
      <span className="text-gray-800 font-medium text-xl">QuizeBlitz</span>
    </div>
    <LoginPage/>
</div>
  );
};

export default Login_SignUp;