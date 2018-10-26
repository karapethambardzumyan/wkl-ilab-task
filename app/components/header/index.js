(function() {
  'use strict';

  angular
    .module('app')
    .controller('HeaderCtrl', ['$scope', 'AuthService', '$translate', 'SpinnerService', function($scope, AuthService, $translate, SpinnerService) {
      $scope.logout = function() {
        AuthService.logout();
      };

      $scope.changeLanguage = function(language) {
        $translate.use(language);
      };
    }])
    .component('headerComponent', {
      templateUrl: './components/header/index.html'
    });
})();
