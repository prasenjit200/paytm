import { Appbar } from "../components/Appbar";
import { Users } from "../components/Users";
import { Button } from "../components/Button";
import { useNavigate } from "react-router-dom"; 
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; 

export const Dashboard = () => {
  const navigate = useNavigate(); 

  return (
    <div className="bg-slate-100 min-h-screen">
      <Appbar />
      <div
        className="relative bg-cover bg-center h-96 flex flex-col justify-center items-center text-white"
        style={{
          backgroundImage: "url('/SignUpBakground.jpg')",
          animation: "fadeIn 2s ease-in-out",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        
        <div className="relative z-10 text-center">
          <h1 className="text-4xl font-bold mb-4">Welcome to Your Dashboard</h1>
          <p className="text-xl mb-8">Manage your funds effortlessly</p>
          <div className="flex space-x-4">
            <Button label="Send Money" onClick={() => navigate("/send")} />
            <Button label="Sign Up" onClick={() => navigate("/signup")} />
            <Button label="Sign In" onClick={() => navigate("/signin")} />
          </div>
        </div>
      </div>
      <div className="m-8">
        <Users />
      </div>

      <footer className="bg-gray-900 text-white py-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="text-center md:text-left">
            <h2 className="text-xl font-bold mb-4">Your Company</h2>
            <p>Manage your money effortlessly with our secure and fast services.</p>
          </div>
          <div className="text-center">
            <h2 className="text-xl font-bold mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li><a href="/" className="hover:text-gray-400">Home</a></li>
              <li><a href="/about" className="hover:text-gray-400">About Us</a></li>
              <li><a href="/services" className="hover:text-gray-400">Services</a></li>
              <li><a href="/contact" className="hover:text-gray-400">Contact</a></li>
            </ul>
          </div>
          <div className="text-center md:text-right">
            <h2 className="text-xl font-bold mb-4">Follow Us</h2>
            <div className="flex justify-center md:justify-end space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:text-white">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-white">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-white">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-blue-700 hover:text-white">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        <div className="text-center mt-8 text-gray-500">
          <p>&copy; 2024 prasenjit. All rights reserved. | Privacy Policy | Terms of Service</p>
        </div>
      </footer>
      <style jsx>{`
        @keyframes fadeIn {
          0% {
            opacity: 0;
          }
          100% {
            opacity: 1;
          }
        }

        .btn {
          transition: background-color 0.3s ease, transform 0.3s ease;
        }

        .btn:hover {
          background-color: #4ade80; /* Bright green on hover */
          transform: scale(1.05); /* Slightly enlarges the button */
        }

        .btn:active {
          background-color: #16a34a; /* Darker green when clicked */
        }
      `}</style>
    </div>
  );
};
