(function() {
  'use strict';

  const rule = /^(([0-9])|([0-2][0-9])|([3][0-1]))-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-\d{2}$/;

  angular
    .module('app')
    .directive('notification', function() {
      return {
        require: 'ngModel',
        link: function(scope, el, attrs, ctrl) {
          ctrl.$validators.notification = function(modelValue, viewValue) {
            if(viewValue === undefined || !rule.test(viewValue)) {
              return false;
            }

            return true;
          }
        }
      };
    });
})();
