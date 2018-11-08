(function() {
  'use strict';

  angular
    .module('app')
    .controller('HeaderCtrl', ['$scope', 'LoginService', '$translate', 'SpinnerService', function($scope, LoginService, $translate, SpinnerService) {
      $scope.logout = function() {
        LoginService.logout();
      };

      $scope.changeLanguage = function(language) {
        $translate.use(language);
      };
    }])
    .component('headerComponent', {
      templateUrl: './components/header/index.html'
    });
})();
