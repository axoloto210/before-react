const App = () => {
  return (
    <React.Fragment>
      <h1>いいねボタン</h1>
      <LikeButton />
    </React.Fragment>
  );
};

const LikeButton = () => {
  const [likedCount, setLikedCount] = React.useState(0);
  const [isError, setIsError] = React.useState(false);

  const clickLikeButtonHandler = () => {
    fetch("http://localhost:4000/api/like", {
      method: "POST",
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setLikedCount(data.likedCount);
      })
      .catch((e) => {
        setIsError(true);
      });
  };

  React.useEffect(() => {
    const fetchInitialLikedCount = async () => {
      await fetch("http://localhost:4000/api/like", {
        method: "GET",
      })
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          setLikedCount(data.likedCount);
        })
        .catch((e) => {
          setIsError(true);
        });
    };
    fetchInitialLikedCount();
  }, []);
  return (
    <button onClick={clickLikeButtonHandler} disabled={isError}>
      {!isError ? `👍+${likedCount}` : "Failed"}
    </button>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
