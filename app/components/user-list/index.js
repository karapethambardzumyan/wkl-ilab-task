(function() {
  'use strict';

  angular
    .module('app')
    .controller('UserListCtrl', ['$rootScope', '$scope', '$translate', 'SpinnerService', 'UserService', function($rootScope, $scope, $translate, SpinnerService, UserService) {
      $scope.user = UserService.user;
      $scope.profile = UserService.profile;

      $scope.isObjectEmpty = function(object) {
        return object === null ? false : Object.keys(object).length === 0;
      };

      $scope.delete = function($event, id) {
        $event.stopPropagation();

        const confirmation = confirm('Do you want to delete this user\'s account?');

        if(confirmation) {
          UserService.deleteUser(id).then(function() {
            UserService.getUsers();
          });
        }
      };

      $scope.update = function($event, id) {
        $event.stopPropagation();

        UserService.selectUpdateableUser(id);
        // UserService.getUser(id);
      };

      $scope.onMouseOver = function($index) {
        $scope.index = $index;
      };

      $scope.onMouseOut = function($index) {
        $scope.index = undefined;
      };

      $scope.onClick = function(id) {
        // UserService.getUser(id);
        UserService.selectUser(id);
      };

      UserService.getUsers()
    }])
    .component('userListComponent', {
      templateUrl: './components/user-list/index.html'
    });
})();
