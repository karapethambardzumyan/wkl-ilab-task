(function() {
  'use strict';

  angular
    .module('app')
    .controller('UserListCtrl', ['$rootScope', '$scope', '$translate', 'SpinnerService', 'UserService', function($rootScope, $scope, $translate, SpinnerService, UserService) {
      $scope.userList = {};
      $scope.profile = UserService.profile;

      $scope.isObjectEmpty = function(object) {
        return Object.keys(object).length === 0;
      };

      $scope.delete = function($event, id) {
        $event.stopPropagation();

        const confirmation = confirm('Do you want to delete this user\'s account?');

        if(confirmation) {
          UserService.deleteUser(id).then(function() {
            SpinnerService.start();
            UserService.getUsers().then(result => {
              $scope.userList = result.data;
              SpinnerService.end();
            });
          });
        }
      };

      $scope.update = function($event, id) {
        $event.stopPropagation();

        UserService.selectUpdateableUser(id);
        SpinnerService.start();
        UserService.getUser(id).then(result => {
          UserService.selectUser(result.data);
          SpinnerService.end();
        });
      };

      $scope.onMouseOver = function($index) {
        $scope.index = $index;
      };

      $scope.onMouseOut = function($index) {
        $scope.index = undefined;
      };

      $scope.onClick = function(id) {
        SpinnerService.start();
        UserService.getUser(id).then(result => {
          UserService.selectUser(result.data);
          SpinnerService.end();
        });
      };

      SpinnerService.start();
      UserService.getUsers().then(result => {
        $scope.userList = result.data;
        SpinnerService.end();
      });
    }])
    .component('userListComponent', {
      templateUrl: './components/user-list/index.html'
    });
})();
