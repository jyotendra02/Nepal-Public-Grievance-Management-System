import React from "react";
import SiteHeader from "./components/Siteheader";
import FileUpload from "./components/FileUpload";
import GrievanceForm from "./components/GrievanceForm";


const App: React.FC = () => {
  
  return (
    <div className="">
      <SiteHeader></SiteHeader>
      <GrievanceForm></GrievanceForm>
      

    </div>
  );
};

export default App;
