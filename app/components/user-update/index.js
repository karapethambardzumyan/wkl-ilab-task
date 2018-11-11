(function() {
  'use strict';

  angular
    .module('app')
    .controller('UserUpdateCtrl', ['$scope', 'SpinnerService', 'UserService', function($scope, SpinnerService, UserService) {
      $scope.profile = UserService.profile;
      $scope.username = $scope.profile.data.name;
      $scope.age = $scope.profile.data.age;
      $scope.birthday = $scope.profile.data.birthday;
      $scope.login = $scope.profile.data.login;
      $scope.notification = $scope.profile.data.notification;

      $scope.close = function() {
        UserService.selectUpdateableUser(null);
      };

      $scope.update = () => {
        if($scope.profileForm.$valid) {
          UserService.updateUser(`name=${ $scope.profileForm.username.$viewValue }&age=${ $scope.profileForm.age.$viewValue }&birthday=${ $scope.profileForm.birthday.$viewValue }&login=${ $scope.profileForm.login.$viewValue }&notification=${ $scope.profileForm.notification.$viewValue }`, function() {
            UserService.selectUpdateableUser(null);
          });
        }
      };
    }])
    .component('userUpdateComponent', {
      templateUrl: './components/user-update/index.html'
    });
})();
