import { Beer, Plus } from "lucide-react";
import Button from "./Button";
import Input from "./Input";
import { useCalculation } from "@/providers/CalculationContext";
import { FormEvent, useRef } from "react";

const App = () => {
  const {
    participants,
    setParticipants,
    setTip,
    setBillTotal,
    tip,
    billTotal,
    removeParticipant,
  } = useCalculation();

  const participantInputRef = useRef<HTMLInputElement>(null);
  const billTotalInputRef = useRef<HTMLInputElement>(null);
  const tipValueInputRef = useRef<HTMLInputElement>(null);

  const addParticipant = (e: FormEvent) => {
    e.preventDefault();

    const name = participantInputRef.current?.value;

    if (!name || participants.includes(name)) {
      return;
    }

    setParticipants([...participants, name]);

    if (participantInputRef.current) {
      participantInputRef.current.value = "";
    }
  };

  const getAllInfo = (e: FormEvent) => {
    e.preventDefault();

    const tip = tipValueInputRef.current?.value;
    const bill = billTotalInputRef.current?.value;

    setTip(Number(tip));
    setBillTotal(Number(bill));

    if (tipValueInputRef.current) {
      tipValueInputRef.current.value = "";
    }
    if (billTotalInputRef.current) {
      billTotalInputRef.current.value = "";
    }
  };

  console.log(participants, "#### PARTICIPANTS");
  console.log(tip, "#### TIP");
  console.log(billTotal, "#### BILL");

  return (
    <div className="w-full bg-gray-50 h-[100vh] flex items-center justify-center">
      <div className="w-[400px] border bg-gray-100 mx-auto space-y-6 px-4 py-6 rounded-md shadow-lg">
        <div className="w-full flex items-center justify-center gap-2">
          <h1 className="text-2xl font-bold">Saidinha</h1>
          <Beer size={28} strokeWidth={2} />
        </div>
        <Input
          label={"Nome do rolê"}
          name={"name"}
          type={"text"}
          placeholder={"Digite o tipo de rolê aqui"}
        />

        {/* FORMULÁRIO DE PARTICIPANTES */}
        <form onSubmit={addParticipant} className="flex gap-2 items-end">
          <Input
            ref={participantInputRef}
            label={"Participantes"}
            name={"participants"}
            type={"text"}
            placeholder={"Quem está participando?"}
          />
          <div className="w-[15%]">
            <Button type="submit">
              <Plus size={24} strokeWidth={2} />
            </Button>
          </div>
        </form>

        {participants.length > 0 ? (
          <div className="w-full flex gap-3 flex-wrap">
            {participants.map((participant, index) => (
              <div
                key={index}
                className="w-fit flex gap-2 items-center justify-center p-2 rounded-md shadow-md"
              >
                <p>{participant}</p>
                <button
                  className="text-sm"
                  type="button"
                  onClick={() => removeParticipant(index)}
                >
                  X
                </button>
              </div>
            ))}
          </div>
        ) : null}

        {/* FORMULÁRIO DE GORJETA E VALOR */}
        <form onSubmit={getAllInfo} className="flex flex-col gap-6">
          <div className="flex gap-4">
            <Input
              ref={billTotalInputRef}
              label={"Valor total da conta"}
              name={"bill"}
              type={"text"}
              placeholder={"0.00"}
            />
            <Input
              ref={tipValueInputRef}
              label={"Valor da gorjeta?(%)"}
              name={"tip"}
              type={"text"}
              placeholder={"10%"}
            />
          </div>
          <Button type="submit">Fazer Conta</Button>
        </form>
      </div>
    </div>
  );
};

export default App;
