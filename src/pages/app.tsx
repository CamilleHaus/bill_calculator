import { Beer, Plus } from "lucide-react";
import Button from "../components/Button";
import Input from "../components/Input";

const App = () => {
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
        <div className="flex gap-2 items-end">
          <Input
            label={"Participantes"}
            name={"participants"}
            type={"text"}
            placeholder={"Quem está participando?"}
          />
          <div className="w-[15%]">
            <Button onClick={() => null}>
              <Plus size={24} strokeWidth={2} />
            </Button>
          </div>
        </div>
        <div></div>
        <div className="flex flex-col gap-6">
          <div className="flex gap-4">
            <Input
              label={"Valor total da conta"}
              name={"bill"}
              type={"text"}
              placeholder={"0.00"}
            />
            <Input
              label={"Valor da gorjeta?"}
              name={"tip"}
              type={"text"}
              placeholder={"10%"}
            />
          </div>
          <Button onClick={() => null}>Fazer Conta</Button>
        </div>
      </div>
    </div>
  );
};

export default App;
