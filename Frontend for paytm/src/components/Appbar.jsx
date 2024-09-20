export const Appbar = () => {
  return (
    <div className="shadow-lg bg-gradient-to-r from-purple-500 to-blue-600 h-16 flex justify-between items-center px-8">
      <div className="text-2xl font-bold text-white">PayTM App</div>
      <div className="flex items-center space-x-4">
        <span className="text-white text-lg">Hello, User</span>
        <div className="relative group">
          <div className="rounded-full h-12 w-12 bg-gray-200 flex justify-center items-center text-2xl font-semibold text-gray-800 shadow-md cursor-pointer">
            U
          </div>
          <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out z-10">
            <ul className="py-2 text-gray-800">
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Profile</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Settings</li>
              <li className="px-4 py-2 hover:bg-gray-200 cursor-pointer">Logout</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
