"use client";

import {
  Dispatch,
  FormEvent,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from "react";

interface CalculationContextProps {
  participants: IParticipant[];
  setParticipants: Dispatch<SetStateAction<IParticipant[]>>;
  setTip: Dispatch<SetStateAction<number | undefined>>;
  setBillTotal: Dispatch<SetStateAction<number | undefined>>;
  tip: number | undefined;
  billTotal: number | undefined;
  removeParticipant: (index: number) => void;
  consuptionInfo: IConsumption[];
  setConsuptionInfo: Dispatch<SetStateAction<IConsumption[]>>;
  amountToPayEach: number[];
  setAmountToPayEach: Dispatch<SetStateAction<number[]>>;
  consuptionList: IConsumption[];
  setConsuptionList:  Dispatch<SetStateAction<IConsumption[]>>;
}

interface IParticipant {
  name: string;
  amount: number[];
}

interface IConsumption {
  name: string;
  price: number;
  people: string[];
}

export const CalculationContext = createContext<
  CalculationContextProps | undefined
>(undefined);

export const CalculationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [participants, setParticipants] = useState<IParticipant[]>([]);
  const [tip, setTip] = useState<number | undefined>();
  const [billTotal, setBillTotal] = useState<number | undefined>();
  const [consuptionInfo, setConsuptionInfo] = useState<IConsumption[]>([]);
  const [amountToPayEach, setAmountToPayEach] = useState<number[]>([]);
  const [consuptionList, setConsuptionList] = useState<IConsumption[]>([]);

  const removeParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  return (
    <CalculationContext.Provider
      value={{
        setParticipants,
        participants,
        setBillTotal,
        setTip,
        tip,
        billTotal,
        removeParticipant,
        consuptionInfo,
        setConsuptionInfo,
        amountToPayEach, 
        setAmountToPayEach,
        consuptionList,
        setConsuptionList
      }}
    >
      {children}
    </CalculationContext.Provider>
  );
};

export const useCalculation = () => {
  const context = useContext(CalculationContext);
  if (context === undefined) {
    throw new Error("useCalculation must be used within a CalculationProvider");
  }
  return context;
};

// Para usar, será chamado o useCalculation desentruturado
