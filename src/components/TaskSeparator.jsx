import PropTypes from "prop-types";

const TaskSeparator = ({ title, icon }) => {
  return (
    <div className="flex gap-3 border-b border-solid border-[F4F4F5] pb-1">
      {icon}
      <p className="text-sm text-brand-text_gray">{title}</p>
    </div>
  );
};

TaskSeparator.PropTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.element.isRequired,
};

export default TaskSeparator;
