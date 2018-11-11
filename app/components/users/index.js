(function() {
  'use strict';

  angular
    .module('app')
    .controller('UsersCtrl', ['$scope', 'UserService', function($scope, UserService) {
      $scope.updateable = UserService.updateable;
    }])
    .component('usersComponent', {
      templateUrl: './components/users/index.html'
    });
})();
