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
    <div>
      <div className="w-full bg-gray-50 p-5 max-sm:p-1 flex items-center justify-center flex-col gap-10">
        <div className="max-w-[450px] w-[100%] border bg-gray-100 mx-auto space-y-4 max-sm:px-4 px-6 py-6 rounded-md shadow-lg">
          <div className="flex justify-center gap-2">
            <h1 className="text-2xl font-bold">Saidinha</h1>
            <Beer size={28} strokeWidth={2} />
          </div>
          <ParticipantsList />
        </div>

        <div className="max-w-[450px] w-[100%] border bg-gray-100 mx-auto space-y-4 max-sm:px-4 px-6 py-6 rounded-md shadow-lg">
          <Calculation />
        </div>
      </div>
    </div>
  );
};

export default App;
