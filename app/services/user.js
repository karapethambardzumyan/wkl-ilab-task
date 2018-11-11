(function() {
  'use strict';

  angular
    .module('app')
    .service('UserService', ['$q', '$http', '$translate', function($q, $http, $translate) {
      return {
        profile: {
          data: null
        },
        selectUser: function(profile) {
          this.profile.data = profile;
        },
        getUsers: function() {
          return $http.get('./api/users', { headers: { token: localStorage.getItem('token') } });
        },
        getUser: function(id) {
          return $http.get('./api/users/' + id, { headers: { token: localStorage.getItem('token') } });
        },
        createUser: function() {
          // will be implemented
        },
        updateUser: function(id) {
          // will be implemented
        },
        deleteUser: function(id) {
          return $http.delete('./api/users/' + id, { headers: { token: localStorage.getItem('token') } });
        }
      };
    }]);
})();
