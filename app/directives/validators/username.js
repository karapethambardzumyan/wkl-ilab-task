(function() {
  'use strict';

  const NAME_REGEXP = /^([A-z][A-Za-z]*\s*[A-Za-z]*)$/;
  const CAMELCASE_REGEXP = /([a-z][A-Z0-9]+)+/;

  angular
    .module('app')
    .directive('username', function() {
      return {
        require: 'ngModel',
        link: function(scope, el, attrs, ctrl) {
          ctrl.$validators.username = function(modelValue, viewValue) {
            if(ctrl.$isEmpty(modelValue)) {
              return true;
            }

            if(CAMELCASE_REGEXP.test(modelValue)) {
              return false;
            }

            if(!NAME_REGEXP.test(viewValue)) {
              return false;
            }

            return true;
          }
        }
      };
    });
})();
