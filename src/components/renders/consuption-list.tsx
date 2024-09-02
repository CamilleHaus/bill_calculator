import React from "react";

interface IConsuptionList {
  onClick: () => void;
  name: string;
  price: number;
}

const ConsuptionList = ({ onClick, name, price }: IConsuptionList) => {
  return (
    <div className="w-fit flex gap-3 items-center justify-center p-2 rounded-md shadow-md">
      <div className="flex gap-1">
        <p>{name}</p>
        <p>{price}</p>
      </div>
      <button className="text-sm" type="button" onClick={onClick}>
        X
      </button>
    </div>
  );
};

export default ConsuptionList;
