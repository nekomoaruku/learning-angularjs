(function() {
  var calendarController = function($scope) {
    $scope.hello = "Hello from Controller!";

  };
  app.controller('calendarController', ['$scope', calendarController]);
})();