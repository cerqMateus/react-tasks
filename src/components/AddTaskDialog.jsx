import "./AddTaskDialog.css";

import { useEffect, useRef } from "react";
import { useState } from "react";
import { createPortal } from "react-dom";
import { CSSTransition } from "react-transition-group";
import { v4 } from "uuid";

import Button from "./Button";
import Input from "./Input";
import TimeSelect from "./TimeSelect";

const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [time, setTime] = useState("morning");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const nodeRef = useRef();

  const HandleSaveClick = () => {
    if (!title.trim || !time || !description) {
      alert("Preencha todos os campos");
    }
    handleSubmit({
      id: v4(),
      title,
      time,
      description,
      status: "not_started",
    });

    handleClose();
  };

  useEffect(() => {
    if (!isOpen) {
      setTime("");
      setTitle("");
      setDescription("");
    }
  }, [isOpen]);
  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      className="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-xl font-semibold text-[#35353E]">
                Nova tarefa
              </h2>
              <p className="mb-4 mt-1 text-sm text-[#9A9C9F]">
                Insira as informações abaixo
              </p>
              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  id="title"
                  label="Título"
                  placeholder="Insira o título da tarefa"
                  value={title}
                  onChange={(event) => setTitle(event.target.value)}
                />
                <TimeSelect
                  value={time}
                  onChange={(event) => setTime(event.target.value)}
                />
                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                />
                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    variant="secondary"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full"
                    onClick={() => {
                      HandleSaveClick();
                    }}
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
        ;
      </div>
    </CSSTransition>
  );
};

export default AddTaskDialog;
