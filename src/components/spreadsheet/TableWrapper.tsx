import { FC, useEffect, useState } from "react";
import { rows, row, tableData } from "../../Types";

import TableContainer from "./TableContainer";

import { FaArrowRotateRight } from "react-icons/fa6";

interface TableWrapperProps {
  localData: rows;
  localHeadings: row;
  isFetching: boolean;
}

const TableWrapper: FC<TableWrapperProps> = ({
  localData,
  localHeadings,
  isFetching,
}) => {
  //isFetching && return (<div></div>) can't do that anymore?

  return isFetching ? (
    <div className="h-full flex overflow-hidden justify-center items-center text-2xl border-2 border-white">
      <div className="mr-4 animate-spin">
        <FaArrowRotateRight />
      </div>
      Fetching Data...
    </div>
  ) : (
    <div className="h-full flex flex-col overflow-hidden rounded-xl border-2">
      {/* <Button
        className="mb-2"
        onClick={() => {
          setLocalData([
            ...TableSorter(localHeadings, localData, "LONGITUDE", true),
          ]); // I had to write this comment so it would actually rerender :/
        }}
      >
        Switch to test data
      </Button> */}
      <TableContainer rows={localData} headings={localHeadings} />
    </div>
  );
};

export default TableWrapper;
