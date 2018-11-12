(function() {
  'use strict';

  angular
    .module('app')
    .service('UserService', ['$q', '$http', '$translate', function($q, $http, $translate) {
      return {
        user: {
          selected: null,
          edited: null,
          list: null
        },



        selectUpdateableUser: function(id) {
          this.user.edited = id === null ? null : { id: id };
        },
        selectUser: function(id) {
          this.user.selected = this.user.list[id];
        },



        getUsers: function() {
          const self = this;

          return $http.get('./api/users', { headers: { token: localStorage.getItem('token') } }).then(function(result) {
            self.user.list = result.data;
          });
        },
        getUser: function(id) {
          const self = this;

          return $http.get('./api/users/' + id, { headers: { token: localStorage.getItem('token') } }).then(function(result) {
            self.user.selected = result.data;
          });
        },
        deleteUser: function(id) {
          if(this.user.selected !== null && this.user.selected.id === id) {
            this.user.selected = null;
          }

          return $http.delete('./api/users/' + id, { headers: { token: localStorage.getItem('token') } });
        },
        updateUser: function(profile, cb) {
          const self = this;

          $http.put('./api/users/' + self.user.edited.id, profile, { headers: { token: localStorage.getItem('token'), 'Content-Type': 'application/x-www-form-urlencoded' } })
            .then(function(result) {
              return cb();
            })
            .catch(function(err) {
              console.log(err);
              alert($translate.instant('INCORRECT_TOKEN'));
            });
        },





        createUser: function() {
          // will be implemented
        },


      };
    }]);
})();
