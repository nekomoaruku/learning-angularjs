var app = angular.module('modal', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

    // For any unmatched url
    $urlRouterProvider.otherwise('/workspace');

    // Set up router
    $stateProvider
      .state('modal', {
        url: '/modal',
        views: {
          '@': {
            templateUrl: 'states/modal/modal.html',
            controller: 'modalController'
          }
        }
      })
      .state('workspace', {
        url: '/workspace',
        views: {
          '@': {
            templateUrl: 'states/workspace/workspace.html',
            controller: 'workspaceController'
          },
          'main@workspace': {
            templateUrl: 'states/workspace/workspace_main.html'
          },
          'sidebar@workspace': {
            templateUrl: 'states/workspace/workspace_sidebar.html'
          },
          '@workspace': {
            templateUrl: 'states/workspace/workspace_main_timeline.html'
          }
        }
      })
      .state('workspace.timeline', {
        url: '/timeline',
        templateUrl: 'states/workspace/workspace_main_timeline.html'
      })
      .state('workspace.calendar', {
        url: '/calendar',
        templateUrl: 'states/workspace/workspace_main_calendar.html'
      });
  }
]);