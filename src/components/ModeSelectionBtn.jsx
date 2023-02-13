function ModeSelectionBtn({ modeSelectionBtnTxt }) {
  return (
    <button
      className={`mode-selection-btn mode-${modeSelectionBtnTxt.toLowerCase()}`}
    >
      {modeSelectionBtnTxt}
    </button>
  );
}
export default ModeSelectionBtn;
