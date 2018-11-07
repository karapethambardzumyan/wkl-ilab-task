(function() {
  'use strict';

  angular
    .module('app')
    .controller('UserChoosenCtrl', ['$rootScope', '$scope', '$translate', 'UsersService', function($rootScope, $scope, $translate, UsersService) {
      $scope.profile = UsersService.profile;
    }])
    .component('userChoosenComponent', {
      templateUrl: './components/user-choosen/index.html'
    });
})();
