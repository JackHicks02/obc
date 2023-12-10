import { FC } from "react";

interface ButtonProps {
  func: () => void;
  text: string;
  icon: JSX.Element;
}

const Button: FC<ButtonProps> = ({ func, text, icon }) => {
  return (
    <div
      onClick={() => func()}
      className="group transition-all h-[320px] w-[240px] bg-slate-950 hover:bg-slate-900 rounded-xl flex flex-col hover:cursor-pointer "
    >
      <div className="flex-[2] bg-slate-200 group-hover:bg-slate-100 rounded-t-xl flex justify-center items-center">
        {icon}
      </div>
      <div className="flex-[1] flex justify-center items-center ">
        <p className="text-center text-xl">{text}</p>
      </div>
    </div>
  );
};

export default Button;
