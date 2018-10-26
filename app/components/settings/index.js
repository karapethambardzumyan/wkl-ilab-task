(function() {
  'use strict';

  angular
    .module('app')
    .controller('SettingsCtrl', ['$scope', 'ProfileService', 'SpinnerService', function($scope, ProfileService, SpinnerService) {
      $scope.update = () => {
        if($scope.profileForm.$valid) {
          ProfileService.put(`name=${ $scope.profileForm.username.$viewValue }&age=${ $scope.profileForm.age.$viewValue }&birthday=${ $scope.profileForm.birthday.$viewValue }&login=${ $scope.profileForm.login.$viewValue }&notification=${ $scope.profileForm.notification.$viewValue }`, function() {
            return $scope.$parent.$parent.$parent.change(0);
          });
        }
      };

      SpinnerService.start();
      ProfileService.get().then(result => {
        $scope.username = result.data.name;
        $scope.age = result.data.age;
        $scope.birthday = result.data.birthday;
        $scope.login = result.data.login;
        $scope.notification = result.data.notification;

        SpinnerService.end();
      });
    }])
    .component('settingsComponent', {
      templateUrl: './components/settings/index.html'
    });
})();
