import { useState } from "react";
import Home from "./Home";
import DataDisplay from "./DataDisplay";

const MainPage = () => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const [index, setIndex] = useState<number>(0);
  const tabMap = [
    <Home
      setIndex={setIndex}
      uploadedFile={uploadedFile}
      setUploadedFile={setUploadedFile}
    />,
    <DataDisplay file={uploadedFile} />,
  ];

  return <div className="">{tabMap[index]}</div>;
};

export default MainPage;
