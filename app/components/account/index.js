(function() {
  'use strict';

  angular
    .module('app')
    .controller('AccountCtrl', ['$scope', '$rootScope', function($scope, $rootScope) {
      console.log($rootScope);
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
