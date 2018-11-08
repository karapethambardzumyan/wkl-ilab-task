(function() {
  'use strict';

  angular
    .module('app')
    .controller('AccountCtrl', ['$scope', function($scope) {
      $scope.index = 0;
      $scope.change = function(index) {
        $scope.index = index;
        return false;
      };
    }])
    .component('accountComponent', {
      templateUrl: './components/account/index.html'
    });
})();
