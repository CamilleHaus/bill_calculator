import { Trash } from "lucide-react";
import React from "react";

interface IConsuptionList {
  onClick: () => void;
  name: string;
  price: number;
}

const ConsuptionList = ({ onClick, name, price }: IConsuptionList) => {
  return (
    <div className="w-full flex gap-3 items-center text-[#666666] justify-between py-3 px-5 rounded-full border text-sm">
      <div className="flex gap-1">
        <p className="font-semibold">{name}</p>
        <p>|</p>
        <p className="font-semibold">{price}</p>
      </div>
      <button className="text-sm" type="button" onClick={onClick}>
        <Trash size={16} />
      </button>
    </div>
  );
};

export default ConsuptionList;
