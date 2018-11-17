(function() {
  'use strict';

  angular
    .module('app')
    .directive('message', function() {
      return {
        require: 'ngModel',
        link: function(scope, el, attrs, ctrl) {
          ctrl.$validators.message = function(modelValue, viewValue) {
            const value = viewValue;

            if(!value || value.length === 0) {
              return false;
            }

            return true;
          }
        }
      };
    });
})();
