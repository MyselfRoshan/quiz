import ModeSelectionItem from "./ModeSelectionItem";
function ModeSelectionContainer(props) {
  //! add insert item as a prop to ModeSelctionItem
  console.log(Object.keys(props));
  const modeSelctionItems = Object.values(props).map((modeSelectionItem) => (
    <ModeSelectionItem
      id={modeSelectionItem.id}
      name={modeSelectionItem.name}
    />
  ));
  return <div className="mode-selection-container">{modeSelctionItems}</div>;
}
export default ModeSelectionContainer;
