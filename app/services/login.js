(function() {
  'use strict';

  angular
    .module('app')
    .service('LoginService', ['$rootScope', '$q', '$http', '$location', '$translate', function($rootScope, $q, $http, $location, $translate) {
      return {
        isAuthorized: null,
        role: null,
        authorize: function(email, password) {
          const self = this;

          $http.post('./api/authorization', 'email=' + email + '&password=' + password, { headers: { 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then(function(result) {
              $rootScope.authorized = self.isAuthorized = true;
              $rootScope.role = self.role = result.data.role;
              localStorage.setItem('token', result.data.token);
              $location.path('/');
            })
            .catch(function(err) {
              if(err.status !== 200) {
                alert($translate.instant('INCORRECT_EMAIL_OR_PASSWORD'));
              }
            });
        },
        authorized: function() {
          if(this.isAuthorized === null) {
            const self = this;
            const defer = $q.defer();

            $http.get('./api/authorization', { headers: { token: localStorage.getItem('token') } }).then(function(result) {
              $rootScope.authorized = self.isAuthorized = true;
              $rootScope.role = self.role = result.data.role;

              defer.resolve();

              if($location.$$path === '/login' || $location.$$path === '/forgot-password') {
                $location.path('/');
              }
            }).catch(function() {
              $rootScope.authorized = self.isAuthorized = false;
              $rootScope.role = self.role = null;

              defer.reject();
            });

            return defer.promise;
          }
        },
        logout: function() {
          const self = this;

          $http.delete('./api/authorization', { headers: { token: localStorage.getItem('token') } })
            .then(function() {
              $rootScope.authorized = self.isAuthorized = null;
              $rootScope.role = self.role = null;
              localStorage.removeItem('token');
              $location.path('/login');
            })
            .catch(function(err) {
              alert(err.data.msg);
            });
        }
      };
    }]);
})();
