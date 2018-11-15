(function() {
  'use strict';

  angular
    .module('app')
    .service('LoggingService', [function() {
      function getDate() {
        const date = new Date();
        const month_names = [
          'Jan','Feb','Mar',
          'Apr','May','Jun',
          'Jul','Aug','Sep',
          'Oct','Nov','Dec'
        ];
        const day = date.getDate();
        const month_index = date.getMonth();
        const year = date.getFullYear();

        return '' + day + '-' + month_names[month_index] + '-' + year;
      };

      function getTime() {
        const date = new Date();
        const hours = date.getHours();
        const minutes = date.getMinutes();
        const seconds = date.getSeconds();
        const milliseconds = date.getMilliseconds();

        return '' + hours + ':' + minutes + ':' + seconds + ':' + milliseconds;
      };

      return {
        log: function(spentTime, url, method) {
          const currentDate = getDate();
          const currentTime = getTime();
          const log = currentDate + ' ' + currentTime + ' - ' + url + ' ' + method + ' ' + spentTime / 1000 + ' seconds were spent for this request';

          console.log(log);
        }
      };
    }]);
})();
