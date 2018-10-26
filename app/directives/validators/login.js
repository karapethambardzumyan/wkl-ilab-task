(function() {
  'use strict';

  const rule = /^(([0-9])|([0-2][0-9])|([3][0-1]))\s(January|February|March|April|May|June|July|August|September|October|November|December)\s\d{4}$/;

  angular
    .module('app')
    .directive('login', function() {
      return {
        require: 'ngModel',
        link: function(scope, el, attrs, ctrl) {
          ctrl.$validators.login = function(modelValue, viewValue) {
            if(viewValue === undefined || !rule.test(viewValue)) {
              return false;
            }

            return true;
          }
        }
      };
    });
})();
