import PropTypes from "prop-types";

import {
  CheckIcon,
  DetailsIcon,
  LoadingIcon,
  TrashIcon,
} from "../assets/icons";
import Button from "../components/Button";

const TaskItem = ({ task, handleCheckBoxClick, handleDeleteClick }) => {
  const getStatusClasses = () => {
    if (task.status === "done") {
      return "bg-brand-primary  text-brand-primary";
    }
    if (task.status === "in_progress") {
      return "bg-brand-process  text-brand-process";
    }
    if (task.status === "not_started") {
      return "bg-brand-dark_blue bg-opacity-10  text-brand-dark_blue";
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
            <LoadingIcon className="h-6 w-6 animate-spin text-brand-white" />
          )}
        </label>

        {task.title}
      </div>
      <div className="flex items-center gap-2">
        <Button
          color="ghost"
          className="text-brand-text_gray"
          onClick={() => handleDeleteClick(task.id)}
        >
          {<TrashIcon />}
        </Button>
        <a href="#">{<DetailsIcon />}</a>
      </div>
    </div>
  );
};

TaskItem.propTypes = {
  task: PropTypes.shape({
    id: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    time: PropTypes.oneOf(["morning", "afternoon", "night"]),
    title: PropTypes.string.isRequired,
    status: PropTypes.oneOf(["done", "in_progress", "not_started"]),
  }).isRequired,
  handleCheckBoxClick: PropTypes.func.isRequired,
  handleDeleteClick: PropTypes.func.isRequired,
};

export default TaskItem;
