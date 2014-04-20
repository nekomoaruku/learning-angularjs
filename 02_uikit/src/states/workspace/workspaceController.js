(function() {

  var workspaceController = function($scope) {
    $scope.message = 'This is message from controller.';
  };
  app.controller('workspaceController', ['$scope', workspaceController]);

})();
