import React, { FormEvent, useRef } from "react";
import Input from "./Input";
import Button from "./Button";
import { Plus } from "lucide-react";
import { useCalculation } from "@/providers/CalculationContext";

const ParticipantsList = () => {
  const {
    participants,
    setParticipants,
    setTip,
    setBillTotal,
    removeParticipant,
  } = useCalculation();

  const participantInputRef = useRef<HTMLInputElement>(null);
  const billTotalInputRef = useRef<HTMLInputElement>(null);
  const tipValueInputRef = useRef<HTMLInputElement>(null);

  const addParticipant = (e: FormEvent) => {
    e.preventDefault();

    const name = participantInputRef.current?.value;

    if (
      !name ||
      participants.some((participant) => participant.name === name)
    ) {
      return;
    }

    setParticipants([...participants, { name, amount: [0] }]);

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

  return (
    <div>
      <div className="mb-4">
        <form onSubmit={addParticipant} className="flex gap-3 items-end mb-2">
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
                <p>{participant.name}</p>
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
      </div>

      {/* FORMULÁRIO DE GORJETA E VALOR */}
      <form onSubmit={getAllInfo} className="flex flex-col gap-6">
        <div className="flex gap-4 max-sm:flex-col">
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
        <Button type="submit">Inserir dados</Button>
      </form>
    </div>
  );
};

export default ParticipantsList;
