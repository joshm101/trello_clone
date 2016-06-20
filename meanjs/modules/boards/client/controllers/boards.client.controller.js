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
                console.log("$scope.rows: ", $scope.rows);
                var rowsLength = $scope.rows.length;
                console.log("rowsLength: ", rowsLength);
                // if the last array in the array of 3s
                // does not have 3 elements, push to that
                // last row array.
                // else create a new array representing a new row
                // and push that new array to $scope.rows
                console.log($scope.rows[rowsLength - 2]);
                if ($scope.rows[rowsLength - 1].length  < 3 &&
                    typeof $scope.rows[rowsLength - 1] !== 'undefined') {
                  $scope.rows[rowsLength - 1].push(board);
                } else {
                  var newRow = [];
                  newRow.push (board);
                  $scope.rows.push (newRow);
                }
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
          $scope.rows = chunk($scope.boards, 3);
          console.log("$scope.rows: ", $scope.rows);
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
