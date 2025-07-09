import React, { FormEvent, useRef } from "react";
import Input from "./Input";
import Button from "./Button";
import { Plus, Trash } from "lucide-react";
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
        <form onSubmit={addParticipant} className="mb-4">
          <div className="flex items-end gap-2">
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
          </div>
        </form>

        {participants.length > 0 ? (
          <div className="w-full flex flex-col gap-1 text-[#666666] font-semibold ">
            {participants.map((participant, index) => (
              <div
                key={index}
                className="flex gap-2 text-sm items-center justify-between py-3 px-5 rounded-full border"
              >
                <p>{participant.name}</p>
                <button
                  className=""
                  type="button"
                  onClick={() => removeParticipant(index)}
                >
                  <Trash size={16}/>
                </button>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      {/* FORMULÁRIO DE GORJETA E VALOR */}
      <form onSubmit={getAllInfo} className="flex flex-col gap-8 pt-3">
        <div className="flex gap-6 flex-col">
          <Input
            ref={billTotalInputRef}
            label={"Valor total da conta"}
            name={"bill"}
            type={"text"}
            placeholder={"0.00"}
          />
          <Input
            ref={tipValueInputRef}
            label={"Valor da gorjeta? (%)"}
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
