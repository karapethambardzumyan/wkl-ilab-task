(function() {
  'use strict';

  angular
    .module('app')
    .controller('ProfileCtrl', ['$scope', 'ProfileService', 'SpinnerService', function($scope, ProfileService, SpinnerService) {
      SpinnerService.start();
      ProfileService.get().then(result => {
        $scope.profile = result.data;

        SpinnerService.end();
      });
    }])
    .component('profileComponent', {
      templateUrl: './components/profile/index.html'
    });
})();
