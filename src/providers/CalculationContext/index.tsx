"use client";

import {
  Dispatch,
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
  pricePerPerson: number;
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
