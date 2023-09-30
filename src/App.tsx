import React from "react";
import SiteHeader from "./components/Siteheader";
import GrievanceForm from "./components/GrievanceForm";
import Footer from "./components/Footer";

const App: React.FC = () => {
  
  return (
    <div className="">
      <SiteHeader></SiteHeader>
      <GrievanceForm></GrievanceForm>
      <Footer></Footer>

    </div>
  );
};

export default App;
