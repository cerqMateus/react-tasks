import { useState } from "react";
import { toast } from "sonner";

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons";
import TASKS from "../constants/tasks";
import AddTaskDialog from "./AddTaskDialog";
import Button from "./Button";
import TaskItem from "./TaskItem";
import TaskSeparator from "./TaskSeparator";

const Tasks = () => {
  const [tasks, setTasks] = useState(TASKS);
  const [addTaskDialogIsOpen, SetAddTaskDialogIsOpen] = useState(false);

  const morningTasks = tasks.filter((task) => task.time === "morning");
  const afternoonTasks = tasks.filter((task) => task.time === "afternoon");
  const eveningTasks = tasks.filter((task) => task.time === "evening");

  const handleCheckBoxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task;
      }
      if (task.status === "not_started") {
        toast.success("Tarefa iniciada com sucesso");
        return { ...task, status: "in_progress" };
      }
      if (task.status === "in_progress") {
        toast.success("Tarefa finalizada com sucesso");
        return { ...task, status: "done" };
      }
      if (task.status === "done") {
        toast.success("Tarefa reiniciada");
        return { ...task, status: "not_started" };
      }
      return task;
    });
    setTasks(newTasks);
  };

  const handleDeleteClick = (taskId) => {
    const newTasks = tasks.filter((task) => task.id != taskId);
    setTasks(newTasks);
    toast.success("Tarefa deletada com sucesso");
  };

  return (
    <div className="w-full px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00ADB5]">
            Minhas tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas tarefas</h2>
        </div>

        <div className="flex items-center gap-3">
          <Button variant={"ghost"}>
            Limpar tarefas
            <TrashIcon />
          </Button>

          <Button
            variant={"primary"}
            onClick={() => SetAddTaskDialogIsOpen(true)}
          >
            Adicionar Tarefa
            <AddIcon />
          </Button>
        </div>
      </div>

      <AddTaskDialog
        isOpen={addTaskDialogIsOpen}
        handleClose={() => SetAddTaskDialogIsOpen(false)}
      />

      {/* LISTA DE TAREFAS */}
      <div className="rounded-xl bg-white p-6">
        {/* MANHÃ */}
        <div className="space-y-3">
          <TaskSeparator title={"Manhã"} icon={<SunIcon />} />
          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckBoxClick={handleCheckBoxClick}
              handleDeleteClick={handleDeleteClick}
            />
          ))}
        </div>

        {/* TARDE */}
        <div className="my-6 space-y-3">
          <TaskSeparator title={"Tarde"} icon={<CloudSunIcon />} />
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckBoxClick={handleCheckBoxClick}
              handleDeleteClick={handleDeleteClick}
            />
          ))}
        </div>

        {/* NOITE */}
        <div className="space-y-3">
          <TaskSeparator title={"Noite"} icon={<MoonIcon />} />
          {eveningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckBoxClick={handleCheckBoxClick}
              handleDeleteClick={handleDeleteClick}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;
