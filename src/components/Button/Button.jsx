export const LoaderBtn = ({ addPage }) => {
    
  return (
    <button
        className="Button"
        type="button"
        onClick={() => {
        addPage(1);
      }}
    >
      Load more
    </button>
  );
};