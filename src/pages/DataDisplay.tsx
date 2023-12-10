import { useState, useEffect, FC } from "react";
import { coordinateList, row, rows } from "../Types";
import TheMap from "../components/map/TheMap";
import TableWrapper from "../components/spreadsheet/TableWrapper";
import makeCoords from "../utils/MakeCoords";
import { Button } from "@chakra-ui/react";

interface DataDisplayProps {
  file?: File | null;
}

const DataDisplay: FC<DataDisplayProps> = ({ file }) => {
  const [localData, setLocalData] = useState<rows>([[]]);
  const [localHeadings, setLocalHeadings] = useState<row>([]);
  const [isFetching, setIsFetching] = useState<boolean>(true);
  const [coords, setCoords] = useState<coordinateList>([]);

  //console.log(coords);
  let csvData: string;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!file) {
          const response = await fetch("/data/ta_exceedences.csv"); //default
          csvData = await response.text();
        } else {
          // If file.text is a function that returns a Promise<string>
          csvData = await file.text();
        } //default

        const arrData = csvData.split("\n");
        const headers = arrData[0].split(",");
        //console.log(headers);

        const rowData: rows = [] as rows;
        //console.log([arrData.slice(1)[0].split(",")]);
        //setLocalData([arrData.slice(1)[0].split(",")]);

        //sanitise for blank lines
        arrData.slice(1).forEach((entry) => {
          const values = entry.split(",");
          if (values.some((value) => value.trim() !== "")) {
            rowData.push(values);
          }
        });

        /*console.log(rowData); //where does the [""] come from??*/
        /* ^ I had already made filtering and the blank line was being pushed to the top*/

        //console.log("final length " + rowData.length);
        setLocalHeadings(headers);
        setLocalData(rowData);
        setIsFetching(false);
        setCoords(makeCoords(headers, rowData));
      } catch (error) {
        console.error("Error fetching CSV data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="w-screen h-screen bg-main text-white transition-all p-4 ">
      <div className="w-full h-full flex">
        <div className="w-full h-full flex flex-col xl:flex-row">
          <div className="xl:w-2/3 xl:h-full h-[400px] xl:mr-2 xl:mb-0 mb-2">
            <TableWrapper
              localData={localData}
              localHeadings={localHeadings}
              isFetching={isFetching}
            />
          </div>
          <div className="xl:w-1/3 xl:ml-2 xl:h-full h-full min-h-[400px] flex justify-center items-center mt-2 xl:mt-0">
            <TheMap coords={coords} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataDisplay;
