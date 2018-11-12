(function() {
  'use strict';

  angular
    .module('app')
    .controller('UsersCtrl', ['$scope', 'UserService', function($scope, UserService) {
      $scope.user = UserService.user;

      $scope.createUser = function() {
        UserService.toggleCreateUser();
      };
    }])
    .component('usersComponent', {
      templateUrl: './components/users/index.html'
    });
})();
