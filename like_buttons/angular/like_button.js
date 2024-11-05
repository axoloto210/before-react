angular.module("likeApp", []).controller("LikeController", [
  "$scope",
  "$http",
  function ($scope, $http) {
    $scope.likedCount = 0;
    $scope.isPending = false;
    $scope.isFailed = false;
    $scope.buttonText = "👍+?";

    $http.get("http://localhost:4000/api/like").then(function (response) {
      $scope.likedCount = response.data.likedCount;
      $scope.buttonText = `👍+${$scope.likedCount}`;
    });

    $scope.clickLikeButton = function () {
      if ($scope.isPending) return;

      $scope.isPending = true;
      $scope.isFailed = false;
      $scope.buttonText = "Processing...";

      $http
        .post("http://localhost:4000/api/like")
        .then(function (response) {
          $scope.likedCount = response.data.likedCount;
          $scope.buttonText = `👍+${$scope.likedCount}`;
        })
        .catch(function () {
          $scope.isFailed = true;
          $scope.buttonText = "Failed";
        })
        .finally(function () {
          $scope.isPending = false;
        });
    };
  },
]);
