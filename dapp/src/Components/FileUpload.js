import { useState } from "react";
import axios from "axios";
import "./FileUpload.css";
const FileUpload = ({ contract, account }) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No file selected");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);
                
                console.log("FormData:", formData);
                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: `7845ba24f78078af24b6`,
                        pinata_secret_api_key: `61dbd80bec51dd0f9857ff1bb9b3c61ebef032ecefc767e9add736e83c1771dc`,
                        "Content-Type": "multipart/form-data",
                    },
                });
                const ImgHash = `https://gateway.pinata.cloud/ipfs/${resFile.data.IpfsHash}`;
                await contract.uploadFile(ImgHash);
                alert("Successfully File Uploaded");
            } catch (e) {
                alert("Error in uploading file. Check the compatibility of file");
                setFileName("No file selected");
                setFile(null);
            }
            setFileName("No file selected");
            setFile(null);
        }
    };
    const retrieveFile = (e) => {
        const data = e.target.files[0]; //files array of files object
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(e.target.files[0]);
        };
        setFileName(e.target.files[0].name);
        e.preventDefault();
    };
    return (
        <div className="top">
            <form className="form" onSubmit={handleSubmit}>
                <p className="addFile">ADD File</p>
                <label htmlFor="file-upload" className="choose">
                    Choose File
                </label>
                <input
                    disabled={!account}
                    type="file"
                    id="file-upload"
                    name="data"
                    onChange={retrieveFile}
                />
                <span className="textArea">{fileName}</span>
                <button type="submit" className="upload" disabled={!file}>
                    Upload File
                </button>
            </form>
        </div>
    );
};
export default FileUpload;
