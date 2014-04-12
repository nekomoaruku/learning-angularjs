(function() {
  var calendarController = function($scope) {
    $scope.hello = "Hello from Calendar Controller!";

  };
  app.controller('calendarController', ['$scope', calendarController]);
})();