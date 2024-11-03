const likeButton = document.getElementById("like-button");

/**
 * いいね数を1 増加させて表示する関数
 */
async function clickLikeButtonHandler() {
  let likedCount = parseInt(likeButton.getAttribute("data-liked-count"), 10);

  await fetch("http://localhost:4000/api/like", {
    method: "POST",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      likedCount = data.likedCount;
    });

  likeButton.setAttribute("data-liked-count", likedCount);
  likeButton.textContent = `👍+${likedCount}`;
}

likeButton.addEventListener("click", clickLikeButtonHandler);
