import { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

import {
  ArrowLeft,
  ChevronRightIcon,
  LoadingIcon,
  TrashIcon,
} from "../assets/icons";
import Button from "../components/Button";
import Input from "../components/Input";
import InputLabel from "../components/InputLabel";
import Sidebar from "../components/Sidebar";
import TimeSelect from "../components/TimeSelect";

const TaskDetailsPage = () => {
  const navigate = useNavigate();
  const { taskId } = useParams();
  const [task, setTask] = useState();
  const [saveIsLoading, setSaveIsLoading] = useState(false);
  const [errors, setErrors] = useState([]);

  const titleRef = useRef();
  const descriptionRef = useRef();
  const timeRef = useRef();

  const handleBackClick = () => {
    navigate(-1);
  };

  useEffect(() => {
    const fetchTask = async () => {
      const reponse = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      });
      const data = await reponse.json();
      setTask(data);
    };
    fetchTask();
  }, [taskId]);

  const handleSaveClick = async () => {
    setSaveIsLoading(true);
    const newErrors = [];
    const title = titleRef.current.value;
    const description = descriptionRef.current.value;
    const time = timeRef.current.value;

    if (!title.trim()) {
      newErrors.push({
        inputName: "title",
        message: "O título é obrigatório.",
      });
    }
    if (!description.trim()) {
      newErrors.push({
        inputName: "description",
        message: "A descrição é obrigatória.",
      });
    }
    if (!time.trim()) {
      newErrors.push({
        inputName: "time",
        message: "O horário é obrigatório.",
      });
    }
    setErrors(newErrors);
    if (newErrors.length > 0) {
      return setSaveIsLoading(false);
    }
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify({ title, description, time }),
    });
    if (!response.ok) {
      toast.error("Erro ao editar a tarefa. Por favor, tente novamente");
      return setSaveIsLoading(false);
    }
    setSaveIsLoading(false);
    toast.success("Tarefa editada com sucesso");

    handleBackClick();
  };

  const titleError = errors.find((error) => error.inputName === "title");
  const timeError = errors.find((error) => error.inputName === "time");
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  );

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        {/* Barra do topo */}
        <div className="flex w-full justify-between">
          <div>
            {/*Parte da esquerda*/}
            <button
              onClick={handleBackClick}
              className="mb-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-brand-primary"
            >
              <ArrowLeft />
            </button>
            <div>
              <div className="flex items-center gap-1 text-xs">
                <Link
                  to="/"
                  onClick={handleBackClick}
                  className="cursor-pointer text-brand-text_gray"
                >
                  Minhas tarefas
                </Link>
                <ChevronRightIcon className="text-brand-text_gray" />
                <span className="font-semibold text-brand-primary">
                  {task?.title}
                </span>
              </div>
              <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
            </div>
          </div>
          {/* Parte da direita */}
          <Button className="h-fit self-end bg-brand-danger">
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        {/* Dados da tarefa */}
        <div className="space-y-6 rounded-xl bg-brand-white p-6">
          <div>
            <Input
              id={task?.id}
              label={"Título"}
              defaultValue={task?.title}
              errorMessage={titleError?.message}
              ref={titleRef}
            />
          </div>

          <div>
            <TimeSelect
              defaultValue={task?.time}
              errorMessage={timeError?.message}
              ref={timeRef}
            />
          </div>

          <div>
            <Input
              id={task?.id}
              label={"Descrição"}
              defaultValue={task?.description}
              errorMessage={descriptionError?.message}
              ref={descriptionRef}
            />
          </div>
        </div>
        <div className="flex w-full justify-end gap-3">
          <Button size="large" color="secondary">
            Cancelar
          </Button>
          <Button
            size="large"
            color="primary"
            onClick={handleSaveClick}
            disabled={saveIsLoading}
          >
            {saveIsLoading && (
              <LoadingIcon className="mr-2 h-2 w-2 animate-spin text-brand-light_gray" />
            )}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
