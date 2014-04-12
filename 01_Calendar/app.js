var app = angular.module('calendar', ['ui.router']);

app.config([
  '$stateProvider',
  '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {

  // For any unmatched url
  $urlRouterProvider.otherwise('/calendar');

  // Set up router
  $stateProvider
    .state('calendar', {
      url: '/calendar',
      views: {
        '@': {
          templateUrl: 'states/calendar/calendar.html',
          controller: 'calendarController'
        }
      }
    });
}]);