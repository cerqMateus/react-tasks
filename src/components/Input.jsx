import PropTypes from "prop-types";

import InputLabel from "./InputLabel";

const Input = ({ label, errorMessage, ...rest }) => {
  return (
    <div className="flex flex-col space-y-1 text-left">
      <InputLabel htmlFor={rest.id}>{label}</InputLabel>
      <input
        className="rounded-lg border border-solid border-[#ECECEC] px-4 py-3 outline-brand-primary placeholder:text-sm placeholder:text-brand-text_gray"
        {...rest}
      />
      {errorMessage && (
        <p className="text-left text-xs text-red-500">{errorMessage}</p>
      )}
    </div>
  );
};

Input.propTypes = {
  label: PropTypes.string.isRequired,
  errorMessage: PropTypes.string,
  id: PropTypes.string.isRequired,
};

export default Input;
