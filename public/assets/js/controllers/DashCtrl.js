app.controller("DashboardController", ["$scope", "$sessionStorage", "$state", function ($scope, $sessionStorage, $state) {

    $scope.tagline = 'To the moon and back!';
    console.log($scope.tagline);

    if (!$sessionStorage.currentUser) {
        $state.go('login');
    } else {
        console.log($sessionStorage.currentUser);
    }

}]);