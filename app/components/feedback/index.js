(function() {
  'use strict';

  angular
    .module('app')
    .controller('FeedbackCtrl', ['$scope', function($scope) {
      $scope.send = function() {
        console.log('send');
      };
    }])
    .component('feedbackComponent', {
      templateUrl: './components/feedback/index.html'
    });
})();
