import React, { FC } from "react";

import {
  APIProvider,
  AdvancedMarker,
  Map,
  Pin,
} from "@vis.gl/react-google-maps";
import { coordinate, coordinateList } from "../../Types";
import numberToColourGradient from "../../utils/NumberToColour";
import { Coordinates, useMap } from "./MapContext";
import formatUnixTime from "../../utils/FormatDateTime";

interface TheMapProps {
  coords: coordinateList;
}

const TheMap: FC<TheMapProps> = ({ coords }) => {
  const { additionalInfo } = useMap();

  //this is unfortunate...
  const isClicked = (coord: coordinate, coordinate: Coordinates): boolean => {
    if (coordinate.lat == coord.latitude && coordinate.lng == coord.longitude) {
      return true;
    }
    return false;
  };

  const makeColour = (
    coord: coordinate,
    coordinate: Coordinates,
    score: number
  ): string => {
    if (isClicked(coord, coordinate)) {
      return "#0000ff";
    }
    return numberToColourGradient(coord.score);
  };

  const { centre, zoom } = useMap();
  return (
    <div className="w-full h-full rounded-xl border-2 p-2 relative">
      <div className="absolute z-50 left-2 bottom-2  w-[calc(100%-8px)] bg-slate-950">
        <div className="w-full h-full">
          <p>
            DATE: {formatUnixTime(additionalInfo.unixTime)} | UNIX TIME:{" "}
            {additionalInfo.unixTime}
          </p>
          <p>ASSET NAME: {additionalInfo.assetName}</p>
          <p>POSITION: {additionalInfo.positionYards}</p>
          <p>RECORDING ID: {additionalInfo.recordingId}</p>
          <p>COORDINATES: {"(" + centre.lat + "," + centre.lng + ")"}</p>
          <p>SCORE: {additionalInfo.score}</p>
          {/* this is duplicate information, could have been prevented unlike the coords coordinates overlap*/}
        </div>
      </div>
      <APIProvider apiKey={"AIzaSyBZGXuMLuG_J37uR8lMTbtah_zr3vK83fA"}>
        <Map
          zoom={zoom}
          center={centre}
          gestureHandling={"greedy"}
          disableDefaultUI={true}
          mapId={"fcc64fafbdfd2322"}
        >
          {coords.map((coord) => (
            <AdvancedMarker
              position={{ lat: coord.latitude, lng: coord.longitude }}
              draggable={false}
            >
              <Pin
                background={makeColour(coord, centre, coord.score)}
                glyphColor={"#000"}
                borderColor={"#000"}
              />
            </AdvancedMarker>
          ))}
        </Map>
      </APIProvider>
    </div>
  );
};

export default TheMap;
