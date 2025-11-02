const Footer = () => {
  return (
    <>
      {/* <div className="absolute bottom-0 mt-20 w-11/12 h-20 flex justify-around items-center">
        <div className="mx-8 w-3/12 flex items-center hover:cursor-pointer">
          <div className="w-8 h-8">
            <img
              // src="../assets/task-flow-logo.jpg"
              src="https://res.cloudinary.com/dicmdo152/image/upload/v1761838191/favicon_p8iaxl.svg"
              alt="Logo"
              className="w-full h-full object-cover border-2 border-blue-500 rounded-lg"
            ></img>
          </div>
          <div className="mx-4 text-blue-500 text-xl font-bold">Task Flow</div>
        </div>
        <div className="text-slate-500 font-medium">
          © {new Date().getFullYear()} Task Flow. All rights reserved.
        </div>
        <div className="text-slate-500 font-medium flex items-center">
          Made with Pride in Bharat
          <div className="w-5 h-5 ml-1">
            <img
              className="w-full h-full object-cover"
              src="https://img.icons8.com/color/48/india.png"
              alt="india"
            />
          </div>
        </div>
      </div> */}
      

        <footer className="h-20 mt-20 w-11/12 mx-auto flex justify-around items-center border-t border-gray-200">
          <div className="mx-8 w-3/12 flex items-center hover:cursor-pointer">
            <div className="w-8 h-8">
              <img
                src="https://res.cloudinary.com/dicmdo152/image/upload/v1761838191/favicon_p8iaxl.svg"
                alt="Logo"
                className="w-full h-full object-cover border-2 border-blue-500 rounded-lg"
              />
            </div>
            <div className="mx-4 text-blue-500 text-xl font-bold">
              Task Flow
            </div>
          </div>

          <div className="text-slate-500 font-medium">
            © {new Date().getFullYear()} Task Flow. All rights reserved.
          </div>

          <div className="text-slate-500 font-medium flex items-center">
            Made with Pride in Bharat
            <div className="w-5 h-5 ml-1">
              <img
                className="w-full h-full object-cover"
                src="https://img.icons8.com/color/48/india.png"
                alt="india"
              />
            </div>
          </div>
        </footer>
      
    </>
  );
};

export default Footer;
