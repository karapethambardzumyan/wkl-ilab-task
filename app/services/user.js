(function() {
  'use strict';

  angular
    .module('app')
    .service('UserService', ['$q', '$http', '$translate', function($q, $http, $translate) {
      return {
        user: {
          selectedId: null,
          editedId: null,
          list: null,
          createState: false
        },
        toggleCreateUser: function() {
          this.user.createState = !this.user.createState;
        },
        selectUser: function(id) {
          this.user.selectedId = id;
        },
        selectEditedUser: function(id) {
          this.user.editedId = id;
        },
        getUsers: function() {
          const self = this;

          return $http.get('./api/users', { headers: { token: localStorage.getItem('token') } }).then(function(result) {
            self.user.list = result.data;
          });
        },
        deleteUser: function(id) {
          if(this.user.selectedId !== null && this.user.list[this.user.selectedId].id === id) {
            this.user.selectedId = null;
          }

          return $http.delete('./api/users/' + id, { headers: { token: localStorage.getItem('token') } });
        },
        updateUser: function(profile, cb) {
          const self = this;

          $http.put('./api/users/' + self.user.editedId, profile, { headers: { token: localStorage.getItem('token'), 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then(function(result) {
              return cb();
            })
            .catch(function(err) {
              alert($translate.instant('INCORRECT_TOKEN'));
            });
        },
        createUser: function(profile, cb) {
          const self = this;

          $http.post('./api/users', profile, { headers: { token: localStorage.getItem('token'), 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then(function(result) {
              return cb();
            })
            .catch(function(err) {
              alert($translate.instant('INCORRECT_TOKEN'));
            });
        }
      };
    }]);
})();
