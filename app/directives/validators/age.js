(function() {
  'use strict';

  angular
    .module('app')
    .directive('age', function() {
      return {
        require: 'ngModel',
        link: function(scope, el, attrs, ctrl) {
          ctrl.$validators.age = function(modelValue, viewValue) {
            const value = Number(viewValue);

            if(isNaN(value) || value < 18 || value > 65) {
              return false;
            }

            return true;
          }
        }
      };
    });
})();
