import React, { useState } from "react";
import axios from "axios";
import { Document, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import "../css/GrievanceForm.css";
import FileUpload from "./FileUpload";

type FormData = {
  [key: string]: string | FileList | null;
  name: string;
  fatherName: string;
  mobileNumber: string;
  dob: string;
  villageLocality: string;
  addressLine1: string;
  addressLine2: string;
  pincode: string;
  grievanceTitle: string;
  grievanceDescription: string;
  policeStation: string;
};

function GrievanceForm() {
  const initialFormData: FormData = {
    name: "",
    fatherName: "",
    mobileNumber: "",
    dob: "",
    villageLocality: "",
    addressLine1: "",
    addressLine2: "",
    pincode: "",
    grievanceTitle: "",
    grievanceDescription: "",
    policeStation: "",
   
  };

  const [formData, setFormData] = useState(initialFormData);
  const [showPdf, setShowPdf] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let newValue: string | FileList | null = value;

    if (type === "file") {
      const fileInput = e.target as HTMLInputElement;
      if (fileInput.files && fileInput.files.length > 0) {
        newValue = fileInput.files;
      } else {
        newValue = null;
      }
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const generatePdf = () => {
    return (
      <Document>
        <Page size="A4">
          <View style={styles.container}>
            <Text>Name: {formData.name}</Text>
            <Text>Father's Name / Husband's Name: {formData.fatherName}</Text>
            <Text>Mobile Number: {formData.mobileNumber}</Text>
            <Text>Date of Birth: {formData.dob}</Text>
            <Text>Village / Locality Name: {formData.villageLocality}</Text>
            <Text>Address Line 1: {formData.addressLine1}</Text>
            <Text>Address Line 2: {formData.addressLine2}</Text>
            <Text>Pincode: {formData.pincode}</Text>
            <Text>Grievance Title: {formData.grievanceTitle}</Text>
            <Text>Grievance Description: {formData.grievanceDescription}</Text>
            <Text>Nearest Police Station: {formData.policeStation}</Text>    
          </View>
        </Page>
      </Document>
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formDataToSend = new FormData();

    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        formDataToSend.append(key, formData[key] as string | Blob);
      }
    }
    
     setShowPdf(true);
    
  };

  const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    
  }
  );

  return (
    <div className="grievance-form-wrapper">
      <div className="grievance-form">
        <h2>Grievance Form / निरिक्षाण प्रपत्र</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name-en">Name:</label>
            <p>नाम:</p>
            <input
              type="text"
              id="name-en"
              name="name"
              placeholder="Enter your name / तपाईंको नाम प्रविष्ट गर्नुहोस्"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="fatherName-en">Father's Name / Husband's Name:</label>
            <p>पिता नाम / पति नाम:</p>
            <input
              type="text"
              id="fatherName-en"
              name="fatherName"
              placeholder="Enter father's/husband's name / पिता/पति को नाम प्रविष्ट गर्नुहोस्"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="mobileNumber-en">Mobile Number:</label>
            <p>मोबाइल नम्बर:</p>
            <input
              type="tel"
              id="mobileNumber-en"
              name="mobileNumber"
              placeholder="Enter your mobile number / तपाईंको मोबाइल नम्बर प्रविष्ट गर्नुहोस्"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="dob-en">Date of Birth:</label>
            <p>जन्म मिति:</p>
            <input type="date" id="dob-en" name="dob" required onChange={handleInputChange} />
          </div>

          <div className="form-group">
            <label htmlFor="villageLocality-en">Village / Locality Name:</label>
            <p>गाउँ / स्थानियता नाम:</p>
            <input
              type="text"
              id="villageLocality-en"
              name="villageLocality"
              placeholder="Enter village/locality name / गाउँ/स्थानियता को नाम प्रविष्ट गर्नुहोस्"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="addressLine1-en">Address Line 1:</label>
            <p>पत्ता प्रमुख लाइन:</p>
            <input
              type="text"
              id="addressLine1-en"
              name="addressLine1"
              placeholder="Enter address line 1 / पत्ता प्रमुख लाइन प्रविष्ट गर्नुहोस्"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="addressLine2-en">Address Line 2:</label>
            <p>पत्ता लाइन २:</p>
            <input
              type="text"
              id="addressLine2-en"
              name="addressLine2"
              placeholder="Enter address line 2 / पत्ता लाइन २ प्रविष्ट गर्नुहोस्"
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="pincode-en">Pincode:</label>
            <p>पिनकोड:</p>
            <input
              type="number"
              id="pincode-en"
              name="pincode"
              placeholder="Enter pincode / पिनकोड प्रविष्ट गर्नुहोस्"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="grievanceTitle-en">Grievance Title:</label>
            <p>दु: ख प्रकट गर्नुहोस्:</p>
            <input
              type="text"
              id="grievanceTitle-en"
              name="grievanceTitle"
              placeholder="Enter grievance title / दु: खको शीर्षक प्रविष्ट गर्नुहोस्"
              required
              onChange={handleInputChange}
            />
          </div>

          <div className="form-group">
            <label htmlFor="grievanceDescription-en">Grievance Description:</label>
            <p>दु: ख विवरण:</p>
            <textarea
              id="grievanceDescription-en"
              name="grievanceDescription"
              placeholder="Enter grievance description / दु: खको विवरण प्रविष्ट गर्नुहोस्"
              required
              onChange={handleInputChange}
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="policeStation-en">Nearest Police Station:</label>
            <p>नजिकैको प्रहरी चौकी:</p>
            <input
              type="text"
              id="policeStation-en"
              name="policeStation"
              placeholder="Enter Nearest Police Station / नजिकैको प्रहरी चौकी:"
              required
              onChange={handleInputChange}
            />
          </div>

          {showPdf ? (
          <div className="pdf-viewer">
            <PDFViewer width="100%" height="500px">
              {generatePdf()}
            </PDFViewer>
          </div>
        ) : (
          <div className="submit-button-wrapper">
            <button type="submit" className="button">
              Submit
            </button>
            </div>
        )}
          <div className="fileupload">
          {showPdf && <FileUpload />}
          </div>
        </form>
      </div>
    </div>
  );
}

export default GrievanceForm;