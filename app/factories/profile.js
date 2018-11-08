(function() {
  'use strict';

  angular
    .module('app')
    .factory('ProfileService', ['$q', '$http', '$translate', function($q, $http, $translate) {
      return {
        get: function() {
          return $http.get('./api/profile', { headers: { token: localStorage.getItem('token') } });
        },
        put: function(profile, cb) {
          $http.put('./api/profile', profile, { headers: { token: localStorage.getItem('token'), 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then(function(result) {
              localStorage.setItem('token', result.data.token);
              return cb();
            })
            .catch(function(err) {
              alert($translate.instant('INCORRECT_TOKEN'));
            });
        },
        post: function() {
          return $http.post('./api/profile', { headers: { token: localStorage.getItem('token') } });
        },
        delete: function(id) {
          return $http.delete('./api/profile/' + id, { headers: { token: localStorage.getItem('token') } });
        },
      };
    }]);
})();
