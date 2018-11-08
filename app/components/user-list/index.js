(function() {
  'use strict';

  angular
    .module('app')
    .controller('UserListCtrl', ['$rootScope', '$scope', '$translate', 'SpinnerService', 'UserService', function($rootScope, $scope, $translate, SpinnerService, UserService) {
      $scope.profile = UserService.profile;

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
