(function() {
  'use strict';

  angular
    .module('app')
    .controller('UserChoosenCtrl', ['$rootScope', '$scope', '$translate', 'UserService', function($rootScope, $scope, $translate, UserService) {
      $scope.user = UserService.user;
    }])
    .component('userChoosenComponent', {
      templateUrl: './components/user-choosen/index.html'
    });
})();
