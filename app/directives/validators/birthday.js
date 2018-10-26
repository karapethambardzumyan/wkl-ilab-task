(function() {
  'use strict';

  const rule = /^\d{4}\/(0[1-9]|1[012])\/(0[1-9]|[12][0-9]|3[01])$/;

  angular
    .module('app')
    .directive('birthday', function() {
      return {
        require: 'ngModel',
        link: function(scope, el, attrs, ctrl) {
          ctrl.$validators.birthday = function(modelValue, viewValue) {
            if(viewValue === undefined || !rule.test(viewValue)) {
              return false;
            }

            return true;
          }
        }
      };
    });
})();
