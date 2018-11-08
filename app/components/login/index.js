(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginCtrl', ['$scope', 'LoginService', function($scope, LoginService) {
      $scope.login = () => {
        if($scope.loginForm.$valid) {
          LoginService.authorize($scope.email, $scope.password);
        }
      };
    }])
    .component('loginComponent', {
      templateUrl: './components/login/index.html'
    });
})();
