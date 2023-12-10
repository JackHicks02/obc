import { FC, useState } from "react";
import { row, rows } from "../../Types";
import { useMap } from "../map/MapContext";
import { defaultCoord, defaultZoom } from "../../utils/variables";

interface TableProps {
  rows: rows;
  columns: number;
}

const Table: FC<TableProps> = ({ rows, columns }) => {
  //console.log(rows[0].length);
  const { setMapZoom, setMapCentre } = useMap();

  const [clickedRow, setClickedRow] = useState(-1);

  const { setAdditionalInfo } = useMap();

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        overflowY: "auto",
        overflowX: "scroll",
        justifyItems: "center",
      }}
    >
      {rows.map((row, index) => {
        const entryRow = index;

        return row.map((entry, index) => {
          const entryCol = index;

          //console.log(`row: ${entryRow + 1}, column: ${entryCol + 1}`);
          return (
            <div
              onClick={() => {
                clickedRow !== entryRow
                  ? (() => {
                      setClickedRow(entryRow);
                      setMapZoom(25);
                      setMapCentre({
                        lat: Number(row[4]),
                        lng: Number(row[5]),
                      });
                      setAdditionalInfo({
                        unixTime: row[0],
                        assetName: row[1],
                        recordingId: row[2],
                        positionYards: row[3],
                        score: row[6],
                      });
                    })()
                  : (() => {
                      setClickedRow(-1);
                      setMapCentre(defaultCoord);
                      setMapZoom(defaultZoom);
                      setAdditionalInfo({
                        unixTime: 0,
                        assetName: "",
                        recordingId: "",
                        positionYards: 0,
                        score: 0,
                      });
                    })();
              }}
              key={`${entryRow}, ${entryCol}`}
              className={` transition-all cursor-pointer cell row-start-${
                entryRow + 1
              } col-start-${entryCol + 1} ${
                clickedRow == entryRow
                  ? "bg-slate-950"
                  : entryRow % 2 == 0
                  ? "bg-slate-900"
                  : "bg-slate-800"
              } w-full flex justify-center items-center text-center`}
            >
              {(entry as string).replace(/^"|"$/g, "")}
            </div>
          );
        });
      })}
    </div>
  );
};

export default Table;
