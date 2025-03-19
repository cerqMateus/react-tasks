import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { ArrowLeft, ChevronRightIcon, TrashIcon } from "../assets/icons";
import Button from "../components/Button";
import Input from "../components/Input";
import InputLabel from "../components/InputLabel";
import Sidebar from "../components/Sidebar";
import TimeSelect from "../components/TimeSelect";

const TaskDetailsPage = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1);
  };

  const { taskId } = useParams();
  const [task, setTask] = useState();

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
          <Button
            onClick={handleBackClick}
            className="h-fit self-end bg-brand-danger"
          >
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        {/* Dados da tarefa */}
        <div className="space-y-6 rounded-xl bg-brand-white p-6">
          <div>
            <Input id={task?.id} label={"Título"} defaultValue={task?.title} />
          </div>

          <div>
            <TimeSelect defaultValue={task?.time} />
          </div>

          <div>
            <Input
              id={task?.id}
              label={"Título"}
              defaultValue={task?.description}
            />
          </div>
        </div>
        <div className="flex w-full justify-end gap-3">
          <Button size="large" color="secondary">
            Cancelar
          </Button>
          <Button size="large" color="primary">
            Salvar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
