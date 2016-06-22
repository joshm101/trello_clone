(function () {
  'use strict';
  angular.module('boards')
    .directive("boardsList", boardsList);

  boardsList.$inject = ['$rootScope', '$timeout', '$interpolate', '$state'];
  function boardsList($rootScope, $timeout, $interpolate, $state) {
    var directive = {
      restrict: 'E',
      transclude: true,
      templateUrl: 'modules/boards/client/views/boards-list.html'
    };
    return directive;
  }

  angular.module('boards')
    .directive('board', board);
  board.$inject = ['$rootScope', '$timeout', '$interpolate', '$state', '$mdDialog', 'Authentication', 'Board'];
  function board($rootScope, $timeout, $interpolate, $state, $mdDialog, Authentication, Board) {
    var directive = {
      restrict: 'E',
      scope: {
        boardName: '@boardname',
        openMenu: '&openMenu'

      },
      link: function (scope, element, attr) {
        scope.showConfirm = function($event) {
          // Appending dialog to document.body to cover sidenav in docs app
          var confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete this board?')
            .ariaLabel('Lucky day')
            .targetEvent($event)
            .ok('Yes')
            .cancel('Cancel');
          $mdDialog.show(confirm).then(function() {
            console.log("ev: ", $event);;
            console.log("Authentication.user.username: ", Authentication.user.username);
            var user = Authentication.user.username;
            var boardToDelete = scope.boardName;
            Board.deleteBoard(user, boardToDelete);

            // deleteBoard();


          }, function() {
            scope.status = 'You decided to keep your debt.';
          });
        }
      },
      templateUrl: 'modules/boards/client/views/board.html'
    };
    return directive;
  }
}());
