import { coordinateList, row, rows } from "../Types";

const makeCoords = ( headings: row, data: rows): coordinateList => {
  const coordinateList:coordinateList = []
  let latIndex = -1
  let longIndex = -1
  let scoreIndex = -1;

  headings.map((entry, index) => {
    if ((entry as string ).toUpperCase() == "LATITUDE") {
      latIndex = index
    }
    if ((entry as string ).toUpperCase() == "LONGITUDE") {
      longIndex = index
    }
    if ((entry as string ).toUpperCase() == "SCORE") {
      scoreIndex = index
    }
  })

  for (let index = 0; index < data.length; index++) {
    const lat = data[index][latIndex];
    const long = data[index][longIndex];
    const score = data[index][scoreIndex]
    //console.log(lat + "," + long + "," + score)

    coordinateList.push({latitude: Number(lat), longitude: Number(long), score: (score)})
  }

  return coordinateList
}
export default makeCoords