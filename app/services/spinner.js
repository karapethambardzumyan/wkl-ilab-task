(function() {
  'use strict';

  angular
    .module('app')
    .factory('SpinnerService', ['$rootScope', function($rootScope) {
      return {
        start: function() {
          $rootScope.spinner = true;
        },
        end: function() {
          $rootScope.spinner = null;
        },
        startChecking: function() {
          $rootScope.checkingSpinner = true;
          $rootScope.checkingSuccess = false;
        },
        endChecking: function(succes) {
          $rootScope.checkingSpinner = false;
          $rootScope.checkingSuccess = succes;
        }
      };
    }]);
})();
