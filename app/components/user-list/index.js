(function() {
  'use strict';

  angular
    .module('app')
    .controller('UserListCtrl', ['$rootScope', '$scope', '$translate', 'SpinnerService', 'UsersService', function($rootScope, $scope, $translate, SpinnerService, UsersService) {
      $scope.onMouseOver = function($index) {
        $scope.index = $index;
      };

      $scope.onMouseOut = function($index) {
        $scope.index = undefined;
      };

      $scope.onClick = function(id) {
        console.log(id);
      };

      SpinnerService.start();
      UsersService.get().then(result => {
        $scope.userList = result.data;

        SpinnerService.end();
      });
    }])
    .component('userListComponent', {
      templateUrl: './components/user-list/index.html'
    });
})();
