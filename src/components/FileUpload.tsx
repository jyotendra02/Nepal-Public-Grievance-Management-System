import React, { useState, useEffect } from "react";
import { addUserOperation } from "../utils/operation";
import { tezos } from "../utils/tezos";
import axios from "axios";

const FileUpload: React.FC = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [file, setFile] = useState<Uint8Array | null>(null);
    const [fileName, setFileName] = useState<string | null>(null);
  
    const onAddUser = async (event: React.FormEvent) => {
      event.preventDefault();
    
      if (file) {
        try {
          const blob = new Blob([file], { type: 'application/octet-stream' });
    
          const formData = new FormData();
          if (fileName) {
            formData.append("file", blob, fileName);
          } else {
            formData.append("file", blob); // Handle case where fileName is null
          }
    
          const resFile = await axios({
            method: "post",
            url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
            data: formData,
            headers: {
              pinata_api_key: `76d92b17caf26289fe6c`,  
              pinata_secret_api_key: `91d3521125be00147dc0ff64096ab8706c7533c236bfc9114a47618c5a470090`,
              "Content-Type": "multipart/form-data",
            },
          });

          const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
          await addUserOperation(ImgHash);
        } catch (error) {
          alert(error);
        }
      }
      else {
        alert ("No File Selected")
      }
    
      
    };
    
    
  
    const retrieveFile = (event: React.ChangeEvent<HTMLInputElement>) => {
      event.preventDefault();
    
      const files = event.target.files;
    
      if (files && files.length > 0) {
        const data = files[0];
        const reader = new window.FileReader();
    
        reader.onloadend = () => {
          if (reader.result instanceof ArrayBuffer) {
            const fileData = new Uint8Array(reader.result);
            setFile(fileData);
            setFileName(data.name);
    
            console.log('File data as ArrayBuffer:', fileData.slice(0, 10));
            console.log('File name:', data.name);
    
          }
        };
    
        reader.readAsArrayBuffer(data);
      } else {
        console.log('No file selected.');
      }
    };
  
    return (
      <div className="">
        
        <div className="d-flex flex-column justify-content-center align-items-center h-100">

            <form>
                <label htmlFor="file-upload">
                    Choose File
                </label>
                <input type="file" id="file-upload" name="data" onChange={retrieveFile} >
                </input>

            <button type="submit"  className="btn btn-primary btn-lg" onClick={onAddUser}>
              Add File
            </button>
            </form>
          </div>
        </div>
    );
  };
  
  export default FileUpload;
  