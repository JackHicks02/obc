import { row, rows } from "../Types";

const TableSorter = (headings: row ,data: rows, colName: string, HighOrLow: boolean): rows => {

  const GetTargetIndex = (target: string): number => {
    for (let index = 0; index < data[0].length; index++) {
      //console.log(headings[index] + " vs " + target)
      if (headings[index] == target) {
        //console.log("index: " + index)
        return index
      }
    }
    return (-1)
  }

  const targetIndex = GetTargetIndex(colName)
  console.log(targetIndex)

  HighOrLow ? 
  data.sort((e1, e2) => {return e1[targetIndex] - e2[targetIndex] }) : 
  data.sort((e1, e2) => {return e2[targetIndex] - e1[targetIndex] }) 

  //console.log(JSON.stringify(data))
  return (data);
}
 
export default TableSorter;