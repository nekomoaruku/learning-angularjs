(function() {
  var calendarController = function($scope, calendar) {

    $scope.daysOfTheWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    $scope.$watch(function() { return calendar.value }, function(newValues) {
      $scope.year = newValues.year;
      $scope.month = newValues.month;
      $scope.weeks = newValues.weeks;
    }, true);

    calendar.setCalendarDate(new Date());

    $scope.goLastMonth = function() {
      calendar.setCalendarDate(new Date($scope.year, $scope.month - 1, 0));
    };

    $scope.goNextMonth = function() {
      calendar.setCalendarDate(new Date($scope.year, $scope.month + 1, 0));
    }

  };
  app.controller('calendarController', ['$scope', 'calendar', calendarController]);
})();