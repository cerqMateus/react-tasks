import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
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
  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm();

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
      reset({
        title: data.title,
        description: data.description,
        time: data.time,
      });
    };
    fetchTask();
  }, [taskId, reset]);

  const handleSaveClick = async (data) => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title: data.title.trim(),
        description: data.description.trim(),
        time: data.time,
      }),
    });
    if (!response.ok) {
      return toast.error("Erro ao editar a tarefa. Por favor, tente novamente");
    }
    toast.success("Tarefa editada com sucesso");

    handleBackClick();
  };

  const handleDeleteClick = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      toast.error("Erro ao deletar a tarefa. Por favor, tente novamente");
      return;
    }
    toast.success("Tarefa deletada com sucesso");
    handleBackClick();
  };

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
            className="h-fit self-end bg-brand-danger"
            onClick={handleDeleteClick}
          >
            <TrashIcon />
            Deletar tarefa
          </Button>
        </div>

        <form onSubmit={handleSubmit(handleSaveClick)}>
          {/* Dados da tarefa */}
          <div className="space-y-6 rounded-xl bg-brand-white p-6">
            <div>
              <Input
                id={task?.id}
                label={"Título"}
                {...register("title", {
                  required: "O título é obrigatório.",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "O título é obrigatório.";
                    }
                    return true;
                  },
                })}
                errorMessage={errors?.title?.message}
              />
            </div>

            <div>
              <TimeSelect
                {...register("time", { required: "O horário é obrigatório." })}
                errorMessage={errors?.time?.message}
              />
            </div>

            <div>
              <Input
                id={task?.id}
                label={"Descrição"}
                {...register("description", {
                  required: "A descrição é obrigatória.",
                  validate: (value) => {
                    if (!value.trim()) {
                      return "A descrição é obrigatória";
                    }
                    return true;
                  },
                })}
                errorMessage={errors?.description?.message}
              />
            </div>
          </div>
          <div className="flex w-full justify-end gap-3">
            <Button
              size="large"
              color="primary"
              type="submit"
              disabled={isSubmitting}
            >
              {isSubmitting && (
                <LoadingIcon className="mr-2 h-2 w-2 animate-spin text-brand-light_gray" />
              )}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
