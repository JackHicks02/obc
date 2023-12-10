import { Heading, IconButton, Show } from "@chakra-ui/react";
import { FC, useEffect, useState } from "react";
import { IoMdArrowDropup } from "react-icons/io";
import filterText from "../../utils/WordFiltering";

type hoverOnOrOff = "enter" | "leave";

interface HeadingEntryProps {
  children: React.ReactNode;
  className?: string;
  name: string;
  currentClicked: string;
  setClicked: React.Dispatch<React.SetStateAction<string>>;
  setIsFilterDown: React.Dispatch<React.SetStateAction<boolean>>;
}

const HeadingEntry: FC<HeadingEntryProps> = ({
  className,
  children,
  setClicked,
  currentClicked,
  setIsFilterDown,
  name,
}) => {
  const [hovered, setHovered] = useState<boolean>(false);
  const [orientationDown, setOrientationDown] = useState<boolean>(true);

  //console.log("name: " + name + " | " + "currentClicked: " + currentClicked);

  const handleClick = () => {
    if (currentClicked == name) {
      setOrientationDown((prevState) => !prevState);
      setIsFilterDown((prevState) => !prevState);
    } else {
      setIsFilterDown(true);
    }

    setClicked(name);
  };

  const handleMouseHover = (onOrOff: hoverOnOrOff) => {
    if (onOrOff == "enter") {
      setHovered(true);

      return;
    }
    setHovered(false);
  };

  return (
    <div
      onMouseEnter={() => handleMouseHover("enter")}
      onMouseLeave={() => handleMouseHover("leave")}
      className={className}
    >
      <div className="flex-1"></div>
      <h2 className="flex-1 flex  justify-center items-center xs:text-sm lg:text-sm">
        {filterText(children as string)}
      </h2>
      <div
        className={`flex ${
          currentClicked == name || hovered ? "visible" : "invisible"
        } flex-1 justify-end items-center`}
      >
        <div className="!transition-none">
          {/*
          Wanted to stop the colour transition from white to grey, 
          thought it might be the transition property applied way way up in App.tsx,
          but apparently not, 
          no clue why it does that*/}
          <IconButton
            className={`${orientationDown ? "rotate-180" : ""}`}
            aria-label="Filter"
            size="small"
            icon={<IoMdArrowDropup />}
            isRound={true}
            style={{
              backgroundColor: `${
                hovered && !(currentClicked == name) ? "grey" : "white"
              }`,
              transitionProperty:
                "transform" /* Never mind, fixed it, this has it's own default css that needs overwriting */,
            }}
            onClick={() => handleClick()}
          />
        </div>
      </div>
    </div>
  );
};

export default HeadingEntry;
