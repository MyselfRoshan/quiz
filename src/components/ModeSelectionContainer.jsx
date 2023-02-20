import { useState } from "react";
import ModeSelectionItem from "./ModeSelectionItem";

function ModeSelectionContainer(props) {
  const [isHovered, setIsHovered] = useState(false);
  const btnTxt = props[0];

  function handleClick(e) {
    setIsHovered(false);
    const id = e.target.getAttribute("data-id");
    // For manipulating dicciculty for api call
    if (id === "difficultyNull") {
      props.setApiUri({ ...props.apiUri, difficulty: "" });
    }
    if (id === "easy" || id === "medium" || id === "hard") {
      props.setApiUri({ ...props.apiUri, difficulty: `&difficulty=${id}` });
    }

    // For manipulating type for api call
    if (id === "typeNull") {
      props.setApiUri({ ...props.apiUri, type: "" });
    }
    if (id === "multiple" || id === "boolean") {
      props.setApiUri({ ...props.apiUri, type: `&type=${id}` });
    }

    // For manipulating category for api call
    if (id === "categoryNull") {
      props.setApiUri({ ...props.apiUri, category: "" });
    }
    if (!isNaN(id)) {
      props.setApiUri({ ...props.apiUri, category: `&category=${id}` });
    }
  }

  const modeSelctionItems = Object.values(props[1]).map((modeSelectionItem) => (
    <ModeSelectionItem
      key={modeSelectionItem.id}
      id={modeSelectionItem.id}
      name={modeSelectionItem.name}
    />
  ));

  return (
    <div className="mode-selection-container">
      {/* !Only show one options when hovered */}
      <button
        key={btnTxt[0]}
        className={`mode-selection-btn ${btnTxt.toLowerCase()}-btn`}
        // onMouseOut={() => setIsHovered(false)}
        onMouseEnter={(e) => setIsHovered(true)}
      >
        {btnTxt}
      </button>

      {isHovered && (
        <div
          className="mode-selection-items"
          onMouseLeave={() => setIsHovered(false)}
          onClick={(e) => handleClick(e)}
        >
          {modeSelctionItems}
        </div>
      )}
    </div>
  );
}
export default ModeSelectionContainer;
