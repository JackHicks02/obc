import React, { createContext, useContext, useState, ReactNode } from "react";
import { defaultZoom } from "../../utils/variables";

interface MapProviderProps {
  children: ReactNode;
}

export type Coordinates = {
  lat: number;
  lng: number;
};

interface MapContextProps {
  centre: Coordinates;
  zoom: number;
  setMapCentre: (newCentre: Coordinates) => void;
  setMapZoom: (newZoom: number) => void;
  additionalInfo: {
    unixTime: number;
    assetName: string;
    recordingId: string;
    positionYards: number;
    score: number;
  };
  setAdditionalInfo: (info: {
    unixTime?: number;
    assetName?: string;
    recordingId?: string;
    positionYards?: number;
    score?: number;
  }) => void;
}

const MapContext = createContext<MapContextProps>({
  centre: { lat: 0, lng: 0 },
  zoom: 6,
  setMapCentre: () => {},
  setMapZoom: () => {},
  additionalInfo: {
    unixTime: 0,
    assetName: "",
    recordingId: "",
    positionYards: 0,
    score: 0,
  },
  setAdditionalInfo: () => {},
});

export const MapProvider: React.FC<MapProviderProps> = ({ children }) => {
  const [centre, setCentre] = useState<Coordinates>({
    lat: 53.850218,
    lng: -1.599973,
  });

  const [zoom, setZoom] = useState<number>(defaultZoom);

  const [additionalInfo, setAdditionalInfoState] = useState({
    unixTime: 0,
    assetName: "",
    recordingId: "",
    positionYards: 0,
    score: 0,
  });

  const setMapCentre = (newCentre: Coordinates) => {
    setCentre(newCentre);
  };

  const setMapZoom = (newZoom: number) => {
    setZoom(newZoom);
  };

  const setAdditionalInfo = (info: {
    unixTime?: number;
    assetName?: string;
    recordingId?: string;
    positionYards?: number;
    score?: number;
  }) => {
    setAdditionalInfoState((prevInfo) => ({
      ...prevInfo,
      ...info,
    }));
  };

  return (
    <MapContext.Provider
      value={{
        centre,
        zoom,
        setMapCentre,
        setMapZoom,
        additionalInfo,
        setAdditionalInfo: setAdditionalInfo,
      }}
    >
      {children}
    </MapContext.Provider>
  );
};

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error("useMap must be used within a MapProvider");
  }
  return context;
};
