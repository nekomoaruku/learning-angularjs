(function() {

  var modalController = function($scope) {
    $scope.message = 'This is message from controller.';

  };

  app.controller('modalController', ['$scope', modalController]);

})();