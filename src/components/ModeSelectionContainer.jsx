import { useState } from "react";
import ModeSelectionItem from "./ModeSelectionItem";

function ModeSelectionContainer(props) {
  const [isHovered, setIsHovered] = useState(false);
  const btnTxt = props[0];

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
        onMouseEnter={() => setIsHovered(true)}
      >
        {btnTxt}
      </button>

      {isHovered && (
        <div
          className="mode-selection-items"
          onMouseLeave={() => setIsHovered(false)}
          onClick={(e) => console.log(e.target.getAttribute("data-id"))}
        >
          {modeSelctionItems}
        </div>
      )}
    </div>
  );
}
export default ModeSelectionContainer;
