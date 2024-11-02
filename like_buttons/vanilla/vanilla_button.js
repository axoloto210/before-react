const likeButton = document.getElementById("like-button");

/**
 * いいね数を1 増加させて表示する関数
 */
function clickLikeButtonHandler() {
  let likedCount = parseInt(likeButton.getAttribute("data-liked-count"), 10);
  likedCount++;
  likeButton.setAttribute("data-liked-count", likedCount);
  likeButton.textContent = `👍+${likedCount}`;
}

document.addEventListener("click", clickLikeButtonHandler);
