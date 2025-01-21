import { useState } from "react";
import { Popover } from "react-tiny-popover";
import { useQuizState } from "../hooks/useQuizState";

function QuizSelectOptions(props) {
  const { type, options } = props;
  const [isPopoverOpen, setIsPopOverOpen] = useState(false);
  const { setApiOptions: setSelectedOptions } = useQuizState();

  const optionsArray = options.map((option, index) => {
    const { id: key, name: value } = option;

    function handleOnChange(event) {
      const selectedValue = event.target.value;
      setSelectedOptions(prev => {
        const updatedOptions = { ...prev, [type]: selectedValue };
        return updatedOptions;
      });
    }

    return (
      <li key={key}>
        <label className="mode-selection-item" htmlFor={`${key}-${index}`}>
          <input
            id={`${key}-${index}`}
            type="radio"
            name={type}
            value={key ?? ""}
            onChange={handleOnChange}
          />
          <span>{value}</span>
        </label>
      </li>
    );
  });

  return (
    <Popover
      isOpen={isPopoverOpen}
      positions={["bottom", "left", "right", "top"]}
      onClickOutside={() => setIsPopOverOpen(false)}
      content={
        <ul className="mode-selection-items">
          {options.length > 0 && optionsArray}
        </ul>
      }
    >
      <button
        className="mode-selection-btn"
        onClick={() => setIsPopOverOpen(!isPopoverOpen)}
      >
        {type.toUpperCase()}
      </button>
    </Popover>
  );
}

export default QuizSelectOptions;
