(function() {
  'use strict';

  angular
    .module('app')
    .directive('password', function($parse) {
      return {
        require: 'ngModel',
        link: function(scope, elem, attrs, ctrl) {
          ctrl.$validators.password = function(modelView, viewValue) {
            if(viewValue && viewValue.length >= 6 && viewValue.length <= 12) {
              return true;
            }

            return false;
          };
        }
      };
    });
})();
