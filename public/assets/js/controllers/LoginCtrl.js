app.controller("LoginController", ["$scope", "$http", "$state", "$sessionStorage", function ($scope, $http, $state, $sessionStorage) {


    $scope.login = function(isValid) {


        if(isValid) {

            var email = $scope.user.email;
            var password = $scope.user.password;

            $http.post('/parse/login', {email: email, password: password}).then(function(response) {
                console.log(response);

                if(response.data) {

                    $sessionStorage.currentUser = {email: email};

                    $state.go('dashboard');
                }
            })


        }


    }

}]);