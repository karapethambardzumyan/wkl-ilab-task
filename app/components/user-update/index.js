(function() {
  'use strict';

  angular
    .module('app')
    .controller('UserUpdateCtrl', ['$scope', 'SpinnerService', 'UserService', function($scope, SpinnerService, UserService) {
      $scope.user = UserService.user;
      $scope.username = $scope.user.list[$scope.user.editedId].name;
      $scope.age = $scope.user.list[$scope.user.editedId].age;
      $scope.birthday = $scope.user.list[$scope.user.editedId].birthday;
      $scope.login = $scope.user.list[$scope.user.editedId].login;
      $scope.notification = $scope.user.list[$scope.user.editedId].notification;

      $scope.close = function() {
        UserService.selectEditedUser(null);
      };

      $scope.update = () => {
        if($scope.profileForm.$valid) {
          UserService.updateUser(`name=${ $scope.profileForm.username.$viewValue }&age=${ $scope.profileForm.age.$viewValue }&birthday=${ $scope.profileForm.birthday.$viewValue }&login=${ $scope.profileForm.login.$viewValue }&notification=${ $scope.profileForm.notification.$viewValue }`, function() {
            UserService.selectEditedUser(null);
            UserService.getUsers();
          });
        }
      };
    }])
    .component('userUpdateComponent', {
      templateUrl: './components/user-update/index.html'
    });
})();
