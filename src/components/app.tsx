import { Beer, Plus } from "lucide-react";
import Button from "./Button";
import Input from "./Input";
import { useCalculation } from "@/providers/CalculationContext";
import { FormEvent, useRef } from "react";
import ConsuptionList from "./renders/consuption-list";
import ParticipantsList from "./participantsList";
import Calculation from "./calculation";

const App = () => {
  // ADICIONAR PARTICIPANTES __________________________________

  // INFORMACAO DE CONSUMO E DIVISAO DE VALORES __________________________________

  return (
    <div className="md:bg-[rgb(214,230,248)] md:px-2 md:py-5">
      <div className="w-full p-1 flex items-center justify-center flex-col md:gap-10">
        <div className="max-w-[450px] w-[100%] md:border bg-gray-100 mx-auto space-y-4 px-8 md:px-6 py-10 rounded-md">
          <div className="flex justify-center gap-2">
            <h1 className="text-2xl font-bold">Saidinha</h1>
            <Beer size={28} strokeWidth={2} />
          </div>
          <ParticipantsList />
        </div>

        <div className="max-w-[450px] w-[100%] md:border bg-gray-100 mx-auto space-y-4 px-8 py-6 rounded-md shadow-lg">
          <Calculation />
        </div>
      </div>
    </div>
  );
};

export default App;
