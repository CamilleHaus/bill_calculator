import React, { FormEvent, useRef } from "react";
import Input from "./Input";
import ConsuptionList from "./renders/consuption-list";
import Button from "./Button";
import { useCalculation } from "@/providers/CalculationContext";

const Calculation = () => {
  const {
    participants,
    setParticipants,
    tip,
    billTotal,
    consuptionList,
    setConsuptionList,
  } = useCalculation();

  const consuptionNameInputRef = useRef<HTMLInputElement>(null);
  const consuptionValueInputRef = useRef<HTMLInputElement>(null);
  const selectPeopleInputRef = useRef<HTMLSelectElement>(null);

  const addConsuptionInformation = (e: FormEvent) => {
    e.preventDefault();

    const consuptionName = consuptionNameInputRef.current?.value as string;
    const consuptionValue = consuptionValueInputRef.current?.value;

    const selectedOptions = selectPeopleInputRef.current?.options;
    const selectedPeople: string[] = [];

    if (selectedOptions) {
      for (let i = 0; i < selectedOptions.length; i++) {
        if (selectedOptions[i].selected) {
          selectedPeople.push(selectedOptions[i].value);
        }
      }
    }

    const tipMath = 1 + tip! / 100;

    const amountToPay = Number(consuptionValue) / selectedPeople.length;
    const amountToPayWithTip = amountToPay * tipMath;

    setConsuptionList([
      ...consuptionList,
      {
        name: consuptionName,
        price: Number(consuptionValue),
        pricePerPerson: amountToPayWithTip,
        people: selectedPeople,
      },
    ]);

    const updatedParticipants = participants.map((participant) => {
      if (selectedPeople.includes(participant.name)) {
        const newAmount = [...participant.amount, amountToPayWithTip];

        return {
          ...participant,
          amount: newAmount,
        };
      }
      return participant;
    });

    setParticipants(updatedParticipants);

    if (consuptionNameInputRef.current) {
      consuptionNameInputRef.current.value = "";
    }

    if (consuptionValueInputRef.current) {
      consuptionValueInputRef.current.value = "";
    }
  };

  const removeConsumedItem = (index: number) => {
    const itemToRemove = consuptionList[index];

    setConsuptionList(consuptionList.filter((_, i) => i !== index));

    const pricePerPersonItem = itemToRemove.pricePerPerson;

    const updatedParticipants = participants.map((participant) => {
      const index = participant.amount.findIndex(
        (num) => num === pricePerPersonItem
      );

      if (index >= 0) {
        const newAmount = [...participant.amount];

        newAmount.splice(index, 1);

        return {
          ...participant,
          amount: newAmount,
        };
      } else {
        return participant;
      }
    });

    setParticipants(updatedParticipants);
  };

  const totalAmount = participants.reduce((acc, participant) => {
    const participantTotal = participant.amount.reduce(
      (sum, value) => sum + value,
      0
    );
    return acc + participantTotal;
  }, 0);

  return (
    <div>
      {/* FORMULÁRIO DE PARTICIPANTES */}

      <div className="flex  mb-4 border text-sm text-[#666666]">
        <div className="w-full flex flex-col items-center bg-gray-50 px-3 py-2 rounded-md gap-2 border-r">
          <p className="text-center">Valor total</p>
          <p className="border-b w-full"></p>
          <p className="mt-1">{billTotal}</p>
        </div>
        <div className="flex flex-col items-center justify-between w-full bg-gray-50 px-3 py-2 rounded-md gap-1">
          <p className="text-center">Valor restante </p>
           <p className="border-b w-full"></p>
          {Number.isNaN(billTotal! - totalAmount) ? (
            <p>0</p>
          ) : (
            <p>{(billTotal! - totalAmount).toFixed(2)}</p>
          )}
        </div>
      </div>
      <form onSubmit={addConsuptionInformation} className="flex flex-col gap-6 pt-4">
        <Input
          ref={consuptionNameInputRef}
          label={"O que foi consumido?"}
          name={"item"}
          type={"text"}
          placeholder={"ex: Cerveja"}
        />

        {consuptionList.length > 0 ? (
          <div className="w-full flex gap-3 flex-wrap mb-2">
            {consuptionList.map((item, index) => (
              <ConsuptionList
                key={index}
                onClick={() => removeConsumedItem(index)}
                name={item.name}
                price={item.price}
              />
            ))}
          </div>
        ) : null}

        <div className="flex flex-col gap-2 mb-2 text-[#666666] font-semibold">
          <label htmlFor="participant-select">Quem consumiu?</label>
          <select
            ref={selectPeopleInputRef}
            id="participant-select"
            className="px-2 py-3 rounded-md"
            multiple
          >
            {participants.length > 0 ? (
              participants.map((participant, index) => (
                <option key={index} value={participant.name} className="text-sm">
                  {participant.name}
                </option>
              ))
            ) : (
              <option disabled>Nenhum participante</option>
            )}
          </select>
        </div>
        <Input
          ref={consuptionValueInputRef}
          label={"Valor do consumo:"}
          name={""}
          type={"text"}
          placeholder={"0.00"}
        />
        <div className="mt-2 mb-6">
          <Button type="submit">Calcular</Button>
        </div>
      </form>

      <div className="space-y-4 border-t text-[#666666] font-semibold ">
        <h3 className="mt-4">Participantes e Valores</h3>
        <div className="w-full flex text-sm justify-between gap-1.5">
          {participants
            ? participants.map((participant, index) => (
                <div
                  key={index}
                  className="w-full flex justify-between border p-3 rounded-full"
                >
                  <p className="truncate max-w-[70%]">{participant.name}</p>
                  <p>
                    {participant.amount.length > 0
                      ? participant.amount
                          .reduce((acc, cur) => acc + cur)
                          .toFixed(2)
                      : 0}
                  </p>
                </div>
              ))
            : null}
        </div>
      </div>
    </div>
  );
};

export default Calculation;
