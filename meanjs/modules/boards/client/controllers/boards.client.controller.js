(function() {
  'use strict';
  angular
    .module('boards', ['ngMaterial'])
    .controller('BoardsController', BoardsController)
    .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log, $http, Board) {
      $scope.boardName = '';
      $scope.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        console.log("okay $scope.close");
        $mdSidenav('right').close()
          .then(function () {

            $log.debug("close RIGHT is done");
            console.log("$scope.boardName: ", $scope.boardName);
            if ($scope.boardName.length > 0) {
              Board.createBoard($scope.boardName);
            }

          });
      };
    });

  BoardsController.$inject = ['$scope', '$rootScope', '$mdDialog', '$mdSidenav', '$http', 'Authentication', 'Board'];
  function BoardsController ( $scope, $rootScope, $mdDialog, $mdSidenav, $http,  Authentication, Board) {
    var originatorEv;

    $scope.isOpenRight = function() {
      return $mdSidenav('right').isOpen();
    };

    $scope.toggleRight = buildToggler('right');


    $scope.createBoard = function () {
      console.log("$scope.boardName: ", $scope.boardName);
    };


    // when the Board service broadcasts an update,
    // get a fresh copy of Board.boards and format
    // the updated boards into rows.
    $scope.$on( 'boards.update', function (event) {
      console.log('boards.update!!@: ', Board.boards);
      var temp = Board.boards;
      console.log("temp is: ", temp);
      $scope.rows = (chunk (temp, 3));
      console.log("$scope.rows: ", $scope.rows);
    });

    this.openMenu = function($mdOpenMenu, $event) {
      originatorEv = $event;

      $mdOpenMenu($event);
    };

    var vm = this;
    vm.user = Authentication.user;
    console.log("vm.user is: ", vm.user);

    $scope.getBoards = function() {
      console.log("$mdSidenav is: ", $mdSidenav);
      Board.getBoards(vm.user);

    };

    function buildToggler(navID) {
      return function() {
        console.log("$mdSidenav is: ", $mdSidenav);
        console.log("buildToggler ", navID);
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav(navID)
          .toggle();
      };
    }

    function deleteBoard() {
      console.log("delete");
    }

  }

  /*
   * given an array arr and a size,
   * create sub arrays containing
   * size # of elements from the
   * original array. This will
   * give us arr.size/size + 1
   * number of subarrays if
   * arr.size/size does not have
   * remainder 0.
   *
   * Thanks to: http://stackoverflow.com/questions/21644493
   * /how-to-split-the-ng-repeat-data-with-three-columns-using-bootstrap
   */
  function chunk (arr, size){
    var newArray = [];
    for (var i = 0; i < arr.length; i += size) {
      newArray.push(arr.slice(i, i + size));
    }
    return newArray;
  }

}());
