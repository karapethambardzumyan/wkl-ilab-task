(function() {
  'use strict';

  angular
    .module('app')
    .factory('UsersService', ['$q', '$http', '$translate', function($q, $http, $translate) {
      return {
        get: function() {
          return $http.get('./api/user-list', { headers: { token: sessionStorage.getItem('token') } });
        }
      };
    }]);
})();
