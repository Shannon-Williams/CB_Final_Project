const FavouriteButton = ({ onClickFunc }) => {
  return (
    <button
      onClick={onClickFunc}
      // onClick={() => {
      //   console.log(`i am insde`);
      // }}
    >
      Add to Favs
    </button>
  );
};

export default FavouriteButton;
