import { FC, useRef, useState } from "react";
import { row, rows } from "../../Types";
import Table from "./Table";
import HeadingEntry from "./HeadingEntry";
import TableSorter from "../../utils/TableSorter";

interface TableContainerProps {
  rows: rows;
  headings: row;
}

const TableContainer: FC<TableContainerProps> = ({ rows, headings }) => {
  //console.log(headings);
  const [clicked, setClicked] = useState<string>(headings[0]);
  const [isFilterLow, setIsFilterLow] = useState<boolean>(true);

  return (
    <>
      <div
        className=" bg-slate-950 border-slate-950 rounded-tr-xl rounded-tl-xl border-y-8 border-r-[15px]"
        // this is disgusting but it's used to counteract the scroll bar that appears below :/
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${headings.length}, 1fr)`,
        }} //This styling was attempted in tailwind but it would sometimes refuse to re render properly, not sure why
      >
        {headings.map((heading, index) => (
          <HeadingEntry
            setClicked={setClicked}
            currentClicked={clicked}
            name={heading}
            key={heading}
            setIsFilterDown={setIsFilterLow}
            className={` col-start-${index + 1} w-full flex 
            
          }`}
          >
            {heading as string}
          </HeadingEntry>
        ))}
      </div>
      <div className="flex-1 overflow-auto">
        <Table
          rows={TableSorter(headings, rows, clicked, isFilterLow)}
          columns={headings.length}
        />
      </div>
    </>
  );
};

export default TableContainer;
