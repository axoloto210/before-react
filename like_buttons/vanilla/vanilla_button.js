const likeButton = document.getElementById("like-button");

/**
 * いいね数を1 増加させて表示する関数
 */
async function clickLikeButtonHandler() {
  let likedCount = parseInt(likeButton.getAttribute("data-liked-count"), 10);
  // 処理中かで条件分岐をする場合には変数が必要に。
  const isPending = likeButton.getAttribute("data-pending") === "true";

  likeButton.setAttribute("data-pending", "true");
  likeButton.setAttribute("disabled", "disabled");

  await fetch("http://localhost:4000/api/like", {
    method: "POST",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      likedCount = data.likedCount;
      likeButton.setAttribute("data-liked-count", likedCount);
      likeButton.textContent = `👍+${likedCount}`;
      likeButton.removeAttribute("disabled");
    })
    .catch(() => {
      likeButton.setAttribute("data-failed", true);
      likeButton.textContent = "failed";
    })
    .finally(() => {
      likeButton.setAttribute("data-pending", "false");
    });
}

likeButton.addEventListener("click", clickLikeButtonHandler);

document.addEventListener("DOMContentLoaded", async () => {
  await fetch("http://localhost:4000/api/like")
    .then((res) => res.json())
    .then((data) => {
      likeButton.setAttribute("data-liked-count", data.likedCount);
      likeButton.textContent = `👍+${data.likedCount}`;
    });
});
