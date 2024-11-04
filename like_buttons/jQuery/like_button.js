const $likeButton = $("#like-button");

/**
 * いいね数を1 増加させて表示する関数
 */
async function clickLikeButtonHandler() {
  let likedCount = parseInt($likeButton.data("liked-count"), 10);
  // 処理中かで条件分岐をする場合には変数が必要に。
  const isPending = $likeButton.data("pending") === "true";

  $likeButton.data("pending", true);
  $likeButton.prop("disabled", true);

  await fetch("http://localhost:4000/api/like", {
    method: "POST",
  })
    .then((res) => {
      return res.json();
    })
    .then((data) => {
      likedCount = data.likedCount;
      $likeButton.data("liked-count", likedCount);
      $likeButton.text(`👍+${likedCount}`);
      $likeButton.prop("disabled", false);
    })
    .catch(() => {
      $likeButton.data("failed", true);
      $likeButton.text("failed");
    })
    .finally(() => {
      $likeButton.data("pending", "false");
    });
}

$likeButton.on("click", clickLikeButtonHandler);


// $(function() {}) は$(document).readyの省略記法
$(document).ready("DOMContentLoaded", async () => {
  await fetch("http://localhost:4000/api/like")
    .then((res) => res.json())
    .then((data) => {
      $likeButton.setAttribute("data-liked-count", data.likedCount);
      $likeButton.textContent = `👍+${data.likedCount}`;
    });
});
