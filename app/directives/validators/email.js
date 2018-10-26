(function() {
  'use strict';

  const rule = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  angular
    .module('app')
    .directive('email', function($parse) {
      return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl) {
          ctrl.$validators.email = function(modelValue, viewValue) {
            if(viewValue && rule.test(viewValue)) {
              return true;
            }

            return false;
          };
        }
      };
    });
})();
