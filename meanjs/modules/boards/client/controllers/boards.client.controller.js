(function() {
  'use strict';
  angular
    .module('boards', ['ngMaterial'])
    .controller('BoardsController', BoardsController)
    .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log, $http) {
      $scope.boardName = '';
      // $scope.boards = '';
      $scope.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('right').close()
          .then(function () {
            $log.debug("close RIGHT is done");
            console.log("$scope.boardName: ", $scope.boardName);
            if ($scope.boardName.length > 0) {
              $http.post('/api/boards/create', { name: $scope.boardName } ).success(function (board, res) {
                $scope.boardName = '';
                console.log("response is: ", board);
                console.log("$scope.boards: ", $scope.boards);
                $scope.boards.push(board);
              });
            }
          });
      };

      $scope.createBoard = function () {
        console.log("$scope.boardName: ", $scope.boardName);
      };
    });
  BoardsController.$inject = ['$scope', '$mdDialog', '$mdSidenav', '$http', 'Authentication'];
  function BoardsController ($scope, $mdDialog, $mdSidenav, $http, Authentication) {
    var vm = this;
    vm.user = Authentication.user;
    console.log("vm.user is: ", vm.user);
    $scope.getBoards = function() {
      console.log("vm: ", vm);
      console.log("authentication is: ", Authentication);
      if (typeof vm.user  !== undefined) {
        console.log("logged in");
        $http.get('/api/boards/get_boards', vm.user).then(function (response) {
          console.log("response: ", response);
          $scope.boards = response.data;
          console.log("$scope.boards: ", $scope.boards);
        });
      }
      // $http.get('/api/boards/get_boards')
    };

    function buildToggler(navID) {
      return function() {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle();
      };
    }

    $scope.isOpenRight = function() {
      return $mdSidenav('right').isOpen();
    };

    $scope.toggleRight = buildToggler('right');

    $scope.close = function () {
      // Component lookup should always be available since we are not using `ng-if`
      $mdSidenav('right').close();
    };
  }

}());
