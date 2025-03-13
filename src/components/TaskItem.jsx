import {
  CheckIcon,
  LoadingIcon,
  DetailsIcon,
  TrashIcon,
} from "../assets/icons";
import Button from "../components/Button";

const TaskItem = ({ task, handleCheckBoxClick, handleDeleteClick }) => {
  const getStatusClasses = () => {
    if (task.status === "done") {
      return "bg-[#00ADB5]  text-[#00ADB5]";
    }
    if (task.status === "in_progress") {
      return "bg-[#FFAA04]  text-[#FFAA04]";
    }
    if (task.status === "not_started") {
      return "bg-[#35383E] bg-opacity-10  text-[#35383E]";
    }
  };

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg bg-opacity-10 px-4 py-3 text-sm transition ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-7 w-7 cursor-pointer items-center justify-center rounded-lg ${getStatusClasses()}`}
        >
          <input
            type="checkbox"
            checked={task.status === "done"}
            className="absolute h-full w-full cursor-pointer opacity-0"
            onChange={() => {
              handleCheckBoxClick(task.id);
            }}
          />
          {task.status === "done" && <CheckIcon />}
          {task.status === "in_progress" && (
            <LoadingIcon className="text-brand-white h-6 w-6 animate-spin" />
          )}
        </label>

        {task.title}
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          className="text-[#9A9C9F]"
          onClick={() => handleDeleteClick(task.id)}
        >
          {<TrashIcon />}
        </Button>
        <a href="#">{<DetailsIcon />}</a>
      </div>
    </div>
  );
};

export default TaskItem;
