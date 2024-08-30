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
    consuptionInfo,
    setConsuptionInfo,
    setAmountToPayEach,
    amountToPayEach,
    consuptionList,
    setConsuptionList,
  } = useCalculation();

  const participantInputRef = useRef<HTMLInputElement>(null);
  const billTotalInputRef = useRef<HTMLInputElement>(null);
  const tipValueInputRef = useRef<HTMLInputElement>(null);
  const consuptionNameInputRef = useRef<HTMLInputElement>(null);
  const consuptionValueInputRef = useRef<HTMLInputElement>(null);
  const selectPeopleInputRef = useRef<HTMLSelectElement>(null);

  // ADICIONAR PARTICIPANTES __________________________________

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

  // INFORMACAO DE CONSUMO E DIVISAO DE VALORES __________________________________

  const addConsuptionInformation = (e: FormEvent) => {
    e.preventDefault();

    const consuptionName = consuptionNameInputRef.current?.value as string;
    const consuptionValue = consuptionValueInputRef.current?.value;

    const selectedOptions = selectPeopleInputRef.current?.options;
    const selectedPeople: any = [];

    if (selectedOptions) {
      for (let i = 0; i < selectedOptions.length; i++) {
        if (selectedOptions[i].selected) {
          selectedPeople.push(selectedOptions[i].value);
        }
      }
    }

    setConsuptionList([
      ...consuptionList,
      {
        name: consuptionName,
        price: Number(consuptionValue),
        people: [selectedPeople],
      },
    ]);

    const tipMath = 1 + tip! / 100;

    const amountToPay = Number(consuptionValue) / selectedPeople.length;
    const amountToPayWithTip = amountToPay * tipMath;

    setAmountToPayEach([...amountToPayEach, amountToPayWithTip]);

    setConsuptionInfo([
      ...consuptionInfo,
      {
        name: consuptionName,
        price: Number(consuptionValue),
        people: selectedPeople,
      },
    ]);

    const updatedParticipants = participants.map((participant) => {
      if (selectedPeople.includes(participant.name)) {
        return {
          ...participant,
          amount: [...amountToPayEach, amountToPayWithTip],
        };
      }
      return participant;
    });

    setParticipants(updatedParticipants);
  };

  // Problema atual da função: O valor está sendo removido da lisa
  // Porém não está sendo removido do total individual de cada participante

  const removeConsumedItem = (index: number) => {
    const removedItem = consuptionList[index];
    setConsuptionList(consuptionList.filter((_, i) => i !== index));

    const updatedParticipants = participants.map((participant) => {
      if (removedItem.people.includes(participant.name)) {
        const priceUpdated = removedItem.price / removedItem.people.length;
        const updatedAmounts = participant.amount.filter(
          (amount) => amount !== priceUpdated
        );

        return {
          ...participant,
          amount: updatedAmounts,
        };
      }

      return participant;
    });
    setParticipants(updatedParticipants);
  };

  console.log(consuptionList, "******* LIST");
  console.log(participants, "PARTICIPANTs");

  return (
    <div>
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

      {/* FORMULÁRIO SEGUINTE */}
      <div className="w-full bg-gray-50 h-[100vh] flex items-center justify-center">
        <div className="w-[400px] border bg-gray-100 mx-auto space-y-6 px-4 py-6 rounded-md shadow-lg">
          <h3>Nome do rolê</h3>
          <div className="flex justify-between">
            <p>Valor total da conta: </p>
            <p>{billTotal}</p>
          </div>
          <form
            onSubmit={addConsuptionInformation}
            className="flex flex-col gap-6"
          >
            <Input
              ref={consuptionNameInputRef}
              label={"O que foi consumido?"}
              name={"item"}
              type={"text"}
              placeholder={"ex: Cerveja"}
            />

            {consuptionList.length > 0 ? (
              <div className="w-full flex gap-3 flex-wrap">
                {consuptionList.map((item, index) => (
                  <div
                    key={index}
                    className="w-fit flex gap-3 items-center justify-center p-2 rounded-md shadow-md"
                  >
                    <div className="flex gap-1">
                      <p>{item.name}</p>
                      <p>{item.price}</p>
                    </div>
                    <button
                      className="text-sm"
                      type="button"
                      onClick={() => removeConsumedItem(index)}
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            ) : null}

            <div className="flex flex-col gap-2">
              <label htmlFor="participant-select">Quem consumiu?</label>
              <select
                ref={selectPeopleInputRef}
                id="participant-select"
                className="px-2 py-3 rounded-md"
                multiple
              >
                {participants.length > 0 ? (
                  participants.map((participant, index) => (
                    <option key={index} value={participant.name}>
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
            <Button type="submit">Enter</Button>
          </form>

          <div className="space-y-4 border-t border-gray-300">
            <h3 className="mt-3">Participantes e Valores</h3>
            <div className="w-full flex flex-wrap justify-between gap-3">
              {participants
                ? participants.map((participant, index) => (
                    <div
                      key={index}
                      className="w-[48%] flex justify-between shadow-md bg-gray-200 p-3 rounded-md"
                    >
                      <p>{participant.name}</p>
                      <p>
                        {participant.amount.reduce((acc, cur) => acc + cur)}
                      </p>
                    </div>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
