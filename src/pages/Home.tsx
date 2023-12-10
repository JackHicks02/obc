import { FC, useState, ChangeEvent } from "react";
import DataDisplay from "./DataDisplay";
import Button from "../components/Home/Button";
import { BsFileEarmarkExcelFill } from "react-icons/bs";
import { FaFileUpload } from "react-icons/fa";

interface HomeProps {
  setIndex: React.Dispatch<React.SetStateAction<number>>;
  uploadedFile: File | null;
  setUploadedFile: React.Dispatch<React.SetStateAction<File | null>>;
}

const Home: FC<HomeProps> = ({ setIndex, uploadedFile, setUploadedFile }) => {
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/csv") {
      setUploadedFile(file);
      setIndex(1);
    } else {
      alert("Must be a CSV!");
    }
  };

  const handleUploadButtonClick = () => {
    if (uploadedFile) {
      setIndex(1);
    } else {
      console.error("No file selected.");
    }
  };

  return (
    <div className="w-screen h-screen bg-main text-white transition-all p-4 flex justify-center items-center">
      <Button
        func={() => setIndex(1)}
        text="View sample"
        icon={
          <BsFileEarmarkExcelFill fontSize={72} className="text-green-500" />
        }
      />
      <p className="text-center text-xl ml-8 mr-8">Or</p>
      <label htmlFor="file-input" className="cursor-pointer">
        <Button
          func={handleUploadButtonClick}
          text="Upload"
          icon={<FaFileUpload fontSize={72} className="text-green-500" />}
        />
        <input
          id="file-input"
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          style={{ display: "none" }}
        />
      </label>
    </div>
  );
};

export default Home;
