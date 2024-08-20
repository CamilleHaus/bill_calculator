"use client";

import Input from "@/components/Input";
import "../../app/globals.css";
import Button from "@/components/Button";
import { useCalculation } from "@/providers/CalculationContext";

const Calculation = () => {
  const {
    participants,
    setParticipants,
    setTip,
    setBillTotal,
    tip,
    billTotal,
    removeParticipant,
  } = useCalculation();

  return (
    <div className="w-full bg-gray-50 h-[100vh] flex items-center justify-center">
      <div className="w-[400px] border bg-gray-100 mx-auto space-y-6 px-4 py-6 rounded-md shadow-lg">
        <h3>Nome do rolê</h3>
        <div className="flex justify-between">
          <p>Valor total da conta: </p>
          <p>{billTotal}</p>
        </div>
        <div className="flex flex-col gap-6">
          <Input
            label={"O que foi consumido?"}
            name={"item"}
            type={"text"}
            placeholder={"ex: Cerveja"}
          />
          <Input
            label={"Quem consumiu?"}
            name={""}
            type={"text"}
            placeholder={"Selecione alguem"}
          />
          <Input
            label={"Valor do consumo:"}
            name={""}
            type={"text"}
            placeholder={"0.00"}
          />
          <Button type="button">Enter</Button>
        </div>

        <div className="space-y-4 border-t border-gray-300">
          <h3 className="mt-3">Participantes e Valores</h3>
          <div className="w-full flex flex-wrap justify-between gap-3">
            <div className="w-[48%] flex justify-between shadow-md bg-gray-200 p-3 rounded-md">
              <p>Camille</p>
              <p>25,00</p>
            </div>
            <div className="w-[48%] flex justify-between shadow-md bg-gray-200 p-3 rounded-md">
              <p>Camille</p>
              <p>25,00</p>
            </div>
            <div className="w-[48%] flex justify-between shadow-md bg-gray-200 p-3 rounded-md">
              <p>Camille</p>
              <p>25,00</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calculation;
