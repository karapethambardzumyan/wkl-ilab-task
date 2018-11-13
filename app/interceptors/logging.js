(function() {
  'use strict';

  angular
    .module('app')
    .factory('LoggingInterceptor', [function() {
      return {
        request: function(config) {
          console.log(config.url);

          return config;
        }
      };
    }]);
})();
