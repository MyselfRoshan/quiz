function ModeSelectionItem(props) {
  return (
    <span className="mode-selection-item" data-id={props.id}>
      {props.name}
    </span>
  );
}
export default ModeSelectionItem;
