(function() {
  'use strict';

  angular
    .module('app')
    .controller('FeedbackCtrl', ['$scope', 'EmailService', 'SpinnerService', function($scope, EmailService, SpinnerService) {
      $scope.send = function() {
        $scope.feedbackModal = true;

        SpinnerService.start();
        EmailService.send('name=' + $scope.username + '&email=' + $scope.email + '&content=' + $scope.message, function() {
          return SpinnerService.end();
        });
      };

      $scope.close = function() {
        $scope.feedbackModal = undefined;
        $scope.username = undefined;
        $scope.email = undefined;
        $scope.message = undefined;

        $scope.feedbackForm.$setPristine();
        $scope.feedbackForm.$setUntouched();
      };
    }])
    .component('feedbackComponent', {
      templateUrl: './components/feedback/index.html'
    });
})();
