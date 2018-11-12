(function() {
  'use strict';

  angular
    .module('app')
    .controller('UserCreateCtrl', ['$scope', 'UserService', function($scope, UserService) {
      $scope.close = function() {
        UserService.toggleCreateUser();
      };

      $scope.createUser = function() {
        UserService.createUser(`email=${ $scope.profileForm.email.$viewValue }&password=${ $scope.profileForm.password.$viewValue }`, function() {
          UserService.getUsers();
          UserService.toggleCreateUser();
        });
      };
    }])
    .component('userCreateComponent', {
      templateUrl: './components/user-create/index.html'
    });
})();
