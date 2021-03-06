(function() {
  'use strict';

  angular
    .module('app', ['ui.router', 'ui.router.state.events', 'pascalprecht.translate'])
    .config(function($stateProvider, $locationProvider, $urlRouterProvider, $translateProvider, $httpProvider) {
      $httpProvider.interceptors.push('LoggingInterceptor');

      $translateProvider.useStaticFilesLoader({
        files: [
          {
            prefix: 'localization/lang-',
            suffix: '.json'
          },
          {
            prefix: 'localization/lang-',
            suffix: '.json'
          }
        ]
      });
      $translateProvider.preferredLanguage('en');

      let baseState = {
        name: 'base',
        url: '/',
        component: 'accountComponent',
        authorization: true,
        resolve: { authorized: LoginService => LoginService.authorized() }
      };

      let loginState = {
        name: 'login',
        url: '/login',
        component: 'loginComponent',
        resolve: { authorized: LoginService => LoginService.authorized() }
      };

      let forgotPasswordState = {
        name: 'forgot-password',
        url: '/forgot-password',
        component: 'forgotPasswordComponent',
        resolve: { authorized: LoginService => LoginService.authorized() }
      };

      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state(baseState)
        .state(loginState)
        .state(forgotPasswordState);
    })
    .run(['$rootScope', '$state', 'LoginService', 'SpinnerService', function($rootScope, $state, LoginService, SpinnerService) {
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
        if(LoginService.isAuthorized && (toState.name === 'login' || toState.name === 'forgot-password')) {
          event.preventDefault();
          $state.go('base');
        }

        if(toState.authorization && LoginService.isAuthorized === false) {
          event.preventDefault();
          $state.go('login');
        }
      });

      $rootScope.$on('$stateChangeError', function(event, toState, toParams, fromState, fromParams, options) {
        event.preventDefault();
        $state.go('login');
      });
    }]);
})();

// notices in the notebook // ????????????????????????????????????//
