(function() {
  'use strict';

  angular
    .module('app')
    .controller('UserListCtrl', ['$rootScope', '$scope', '$translate', 'SpinnerService', 'UsersService', function($rootScope, $scope, $translate, SpinnerService, UsersService) {
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
