(function() {
  'use strict';

  angular
    .module('app')
    .service('UserService', ['$q', '$http', '$translate', function($q, $http, $translate) {
      return {
        users: {
          list: null
        },
        profile: {
          data: null
        },
        updateable: {
          id: null
        },
        selectUpdateableUser: function(id) {
          this.updateable.id = id;
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
        updateUser: function(profile, cb) {
          const self = this;

          $http.put('./api/users/' + self.updateable.id, profile, { headers: { token: localStorage.getItem('token'), 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then(function(result) {
              return cb();
            })
            .catch(function(err) {
              console.log(err);
              alert($translate.instant('INCORRECT_TOKEN'));
            });
        },
        deleteUser: function(id) {
          if(this.profile.data.id === id) {
            this.profile.data = null;
          }

          return $http.delete('./api/users/' + id, { headers: { token: localStorage.getItem('token') } });
        }
      };
    }]);
})();
