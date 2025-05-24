const Selected = ({ option }) => {
  if (!option) return null; 
  if (option.code && option.name && !option.price) {
    return (
      <div className="selected-display">
        <p>{option.name} ({option.code})</p>
      </div>
    );
  }
  return null;
};

export default Selected;