(function() {
  'use strict';

  angular
    .module('app')
    .directive('unique', ['$q', '$timeout', 'SpinnerService', function($q, $timeout, SpinnerService) {
      return {
        require: 'ngModel',
        link: function(scope, el, attrs, ctrl) {
          const usernames = ['User A', 'User B'];

          ctrl.$asyncValidators.unique = function(modelValue, viewValue) {
            const defer = $q.defer();

            if(ctrl.$dirty) {
              SpinnerService.startChecking();
            }

            $timeout(function() {
              if(usernames.indexOf(modelValue) === -1) {
                defer.resolve();
                SpinnerService.endChecking(false);
              } else {
                defer.reject();
                SpinnerService.endChecking(true);
              }
            }, 3000);

            return defer.promise;
          }
        }
      };
    }]);
})();
