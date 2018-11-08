(function() {
  'use strict';

  angular
    .module('app')
    .controller('UserChoosenCtrl', ['$rootScope', '$scope', '$translate', 'UserService', function($rootScope, $scope, $translate, UserService) {
      $scope.profile = UserService.profile;
    }])
    .component('userChoosenComponent', {
      templateUrl: './components/user-choosen/index.html'
    });
})();
