app.controller("MainController", ["$scope", "$http", "$state", function ($scope, $http) {

    $scope.tagline = 'To the moon and back!';
    console.log($scope.tagline);

    $scope.signUp = {};


    $scope.signUp = function(isValid) {


        if(isValid) {


            var user = {
                first: $scope.firstName,
                last: $scope.lastName,
                email: $scope.email,
                password: $scope.password
            };

            console.log(user);

            $http.post('/parse/signup', user).then(function (response) {
                console.log(response);
                user = {};

                $scope.signUpForm.$setPristine(true);
            });
        }

    }

}]);