app.controller("MainController", ["$scope", "$http", "$state", function ($scope, $http, $state) {

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

                if(response.data === true) {
                    $state.go('dashboard');
                }
            });
        }

    }

}]);