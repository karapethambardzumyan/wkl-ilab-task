(function() {
  'use strict';

  angular
    .module('app')
    .factory('UsersService', ['$q', '$http', '$translate', function($q, $http, $translate) {
      return {
        profile: {
          data: null
        },
        getUserList: function() {
          return $http.get('./api/user-list', { headers: { token: localStorage.getItem('token') } });
        },
        getUser: function(id) {
          return $http.get('./api/user-list/' + id, { headers: { token: localStorage.getItem('token') } });
        },
        choosen: function(profile) {
          this.profile.data = profile;
        }
      };
    }]);
})();
