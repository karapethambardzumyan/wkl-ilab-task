(function() {
  'use strict';

  angular
    .module('app')
    .controller('LoginCtrl', ['$scope', 'AuthService', function($scope, AuthService) {
      $scope.login = () => {
        if($scope.loginForm.$valid) {
          AuthService.authorize($scope.email, $scope.password);
        }
      };
    }])
    .component('loginComponent', {
      templateUrl: './components/login/index.html'
    });
})();
