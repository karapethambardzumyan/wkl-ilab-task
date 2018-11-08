(function() {
  'use strict';

  angular
    .module('app')
    .controller('UserListCtrl', ['$rootScope', '$scope', '$translate', 'SpinnerService', 'UserService', 'ProfileService', function($rootScope, $scope, $translate, SpinnerService, UserService, ProfileService) {
      $scope.profile = UserService.profile;

      $scope.delete = function($event, id) {
        $event.stopPropagation();

        const confirmation = confirm('Do you want to delete this user\'s account?');

        if(confirmation) {
          ProfileService.delete(id).then(function() {
            SpinnerService.start();
            UserService.getUserList().then(result => {
              $scope.userList = result.data;
              SpinnerService.end();
            });
          });
        }
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
          UserService.choosen(result.data);
          SpinnerService.end();
        });
      };

      SpinnerService.start();
      UserService.getUserList().then(result => {
        $scope.userList = result.data;
        SpinnerService.end();
      });
    }])
    .component('userListComponent', {
      templateUrl: './components/user-list/index.html'
    });
})();
