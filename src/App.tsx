import React from "react";
import Navbar from "./components/Navbar";

import FileUpload from "./components/FileUpload";


const App: React.FC = () => {
  
  return (
    <div className="">
      <Navbar />
      <FileUpload></FileUpload>
    </div>
  );
};

export default App;
