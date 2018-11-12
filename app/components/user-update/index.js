(function() {
  'use strict';

  angular
    .module('app')
    .controller('UserUpdateCtrl', ['$scope', 'SpinnerService', 'UserService', function($scope, SpinnerService, UserService) {
      $scope.user = UserService.user;
      $scope.username = $scope.user.selected.name;
      $scope.age = $scope.user.selected.age;
      $scope.birthday = $scope.user.selected.birthday;
      $scope.login = $scope.user.selected.login;
      $scope.notification = $scope.user.selected.notification;

      $scope.close = function() {
        UserService.selectUpdateableUser(null);
      };

      $scope.update = () => {
        if($scope.profileForm.$valid) {
          UserService.updateUser(`name=${ $scope.profileForm.username.$viewValue }&age=${ $scope.profileForm.age.$viewValue }&birthday=${ $scope.profileForm.birthday.$viewValue }&login=${ $scope.profileForm.login.$viewValue }&notification=${ $scope.profileForm.notification.$viewValue }`, function() {
            UserService.selectUpdateableUser(null);
            UserService.getUsers();
            UserService.getUser($scope.user.selected.id);
          });
        }
      };
    }])
    .component('userUpdateComponent', {
      templateUrl: './components/user-update/index.html'
    });
})();
