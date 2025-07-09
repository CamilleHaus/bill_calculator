import React from "react";

interface IConsuptionList {
  onClick: () => void;
  name: string;
  price: number;
}

const ConsuptionList = ({ onClick, name, price }: IConsuptionList) => {
  return (
    <div className="w-fit flex gap-3 items-center text-[#666666] justify-center py-2 rounded-full border px-4 text-sm font-semibold">
      <div className="flex gap-1">
        <p>{name} |</p>
        <p>{price}</p>
      </div>
      <button className="text-sm" type="button" onClick={onClick}>
        X
      </button>
    </div>
  );
};

export default ConsuptionList;
