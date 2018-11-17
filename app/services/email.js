(function() {
  'use strict';

  angular
    .module('app')
    .service('EmailService', ['$http', '$translate', function($http, $translate) {
      return {
        send: function(data, cb) {
          $http.post('./api/feedback', data, { headers: { token: localStorage.getItem('token'), 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then(function(result) {
              return cb();
            })
            .catch(function(err) {
              console.log(err);
              alert($translate.instant('INCORRECT_TOKEN'));
            });
        }
      };
    }]);
})();
