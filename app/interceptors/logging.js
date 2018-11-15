(function() {
  'use strict';

  angular
    .module('app')
    .factory('LoggingInterceptor', ['LoggingService', function(LoggingService) {
      function ifApi(url) {
        return !/\.html|\.json/.test(url);
      };

      return {
        request: function(config) {
          if(ifApi(config.url)) {
            config.startTime = new Date().getTime();
          }

          return config;
        },
        response: function(response) {
          if(ifApi(response.config.url)) {
            const endTime = new Date().getTime();
            const spentTime = endTime - response.config.startTime;

            LoggingService.log(spentTime, response.config.url, response.config.method);
          }

          return response;
        }
      };
    }]);
})();
