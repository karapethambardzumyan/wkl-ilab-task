(function() {
  'use strict';

  angular
    .module('app', ['ui.router', 'ui.router.state.events', 'pascalprecht.translate'])
    .config(function($stateProvider, $locationProvider, $urlRouterProvider, $translateProvider) {
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
        resolve: { authorized: AuthService => AuthService.authorized() }
      };

      let loginState = {
        name: 'login',
        url: '/login',
        component: 'loginComponent',
        resolve: { authorized: AuthService => AuthService.authorized() }
      };

      let forgotPasswordState = {
        name: 'forgot-password',
        url: '/forgot-password',
        component: 'forgotPasswordComponent',
        resolve: { authorized: AuthService => AuthService.authorized() }
      };

      let usersState = {
        name: 'users',
        url: '/users',
        component: 'usersComponent',
        resolve: { authorized: AuthService => AuthService.authorized() }
      };

      $locationProvider.html5Mode(true);
      $urlRouterProvider.otherwise('/');

      $stateProvider
        .state(baseState)
        .state(loginState)
        .state(forgotPasswordState)
        .state(usersState);
    })
    .run(['$rootScope', '$state', 'AuthService', 'SpinnerService', function($rootScope, $state, AuthService, SpinnerService) {
      $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams, options) {
        if(AuthService.isAuthorized && (toState.name === 'login' || toState.name === 'forgot-password')) {
          event.preventDefault();
          $state.go('base');
        }

        if(toState.authorization && AuthService.isAuthorized === false) {
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
