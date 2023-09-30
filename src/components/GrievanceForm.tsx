import React, { useState } from "react";
import axios from "axios"; // Import axios for making API requests
import "../css/GrievanceForm.css"; // Import the CSS file for styling

// Define the type for the form data
type FormData = {
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
  photo: File | null;
  pdf: File | null;
};

function GrievanceForm() {
  // Define the initial state for form data
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
    photo: null,
    pdf: null,
  };

  const [formData, setFormData] = useState(initialFormData);

  // Event handler to update form data when input fields change
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    let newValue: string | File | null = value;

    if (type === "file") {
      // Type assertion to specify that e.target is an HTMLInputElement
      const fileInput = e.target as HTMLInputElement;
      if (fileInput.files && fileInput.files.length > 0) {
        newValue = fileInput.files[0];
      } else {
        newValue = null;
      }
    }

    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  // Event handler for form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Create a new FormData object to store the form data
    const formDataToSend = new FormData();

    // Iterate over the formData state and append each key-value pair to formDataToSend
    for (const key in formData) {
      if (formData.hasOwnProperty(key)) {
        formDataToSend.append(key, formData[key] as string | Blob);
      }
    }

    try {
      // Upload the form data to Pinata
      const resFile = await axios({
        method: "post",
        url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
        data: formDataToSend,
        headers: {
          pinata_api_key: "YOUR_PINATA_API_KEY",
          pinata_secret_api_key: "YOUR_PINATA_SECRET_API_KEY",
          "Content-Type": "multipart/form-data",
        },
      });

      // The IPFS hash where the data is stored
      const dataHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;

      // Now you can use 'dataHash' or perform any further actions
      console.log("Data Hash:", dataHash);
    } catch (error) {
      console.error("Error uploading to Pinata:", error);
    }
  };
  
  return (
    <div className="grievance-form-wrapper">
      <div className="grievance-form">
        <h2>Grievance Form / निरिक्षाण प्रपत्र</h2>
        <form onSubmit={handleSubmit} >
          <div className="form-group">
            <label htmlFor="name-en">Name:</label>
            <p>नाम:</p>
            <input
              type="text"
              id="name-en"
              name="name"
              placeholder="Enter your name / तपाईंको नाम प्रविष्ट गर्नुहोस्"
              required
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
            />
          </div>

          <div className="form-group">
            <label htmlFor="dob-en">Date of Birth:</label>
            <p>जन्म मिति:</p>
            <input type="date" id="dob-en" name="dob" required />
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
            />
          </div>

          <div className="form-group">
            <label htmlFor="pincode-en">Pincode:</label>
            <p>पिनकोड:</p>
            <input
              type="text"
              id="pincode-en"
              name="pincode"
              placeholder="Enter pincode / पिनकोड प्रविष्ट गर्नुहोस्"
              required
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
            ></textarea>
          </div>

          <div className="form-group">
            <label htmlFor="policeStation-en">Police Station Name:</label>
            <p>प्रहरी थाना नाम:</p>
            <input
              type="text"
              id="policeStation-en"
              name="policeStation"
              placeholder="Enter police station name / प्रहरी थाना को नाम प्रविष्ट गर्नुहोस्"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="photo-en">Submit your application photo:</label>
            <p>तपाईंको आवेदन फोटो पेश गर्नुहोस्:</p>
            <input
              type="file"
              id="photo-en"
              name="photo"
              accept="image/*"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="pdf-en">Submit your application PDF (if needed):</label>
            <p>तपाईंको आवेदन पीडीएफ पेश गर्नुहोस् (आवश्यक छ भने):</p>
            <input
              type="file"
              id="pdf-en"
              name="pdf"
              accept=".pdf"
            />
          </div>

          {/* Submit Button */}
          <button type="submit" className="button">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default GrievanceForm;
