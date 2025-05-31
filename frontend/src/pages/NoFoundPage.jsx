import { useNavigate } from 'react-router-dom';


const NotFound = () => {
  const navigate = useNavigate();
const isLoggedIn=false
  return (   
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-6 space-y-10">
       

      <div className="text-center max-w-md">
        <h1 className="text-7xl font-extrabold mb-4 tracking-wide">404</h1>
        <p className="text-xl mb-8 text-gray-300">
          Oops! The page you are looking for does not exist.
        </p>

        <div className="flex justify-center gap-6">
          {isLoggedIn ? (
            <button
              onClick={() => navigate('/home')}
              className="px-8 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg font-semibold transition shadow-lg"
            >
              Go to Home
            </button>
          ) : (
            <button
              onClick={() => navigate('/dashboard')}
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 rounded-lg font-semibold transition shadow-lg"
            >
              Go to Dashboard
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFound;
