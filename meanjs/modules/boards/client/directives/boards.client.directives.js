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
  board.$inject = ['$rootScope', '$timeout', '$interpolate', '$state', '$mdDialog', '$mdToast', 'Authentication', 'Board'];
  function board($rootScope, $timeout, $interpolate, $state, $mdDialog, $mdToast, Authentication, Board) {
    var directive = {
      restrict: 'E',
      scope: {
        boardName: '@boardname',
        openMenu: '&openMenu'

      },
      link: function (scope, element, attr) {
        var last = {
          bottom: false,
          top: true,
          left: false,
          right: true
        };
        var boardToDelete;
        scope.toastPosition = angular.extend({},last);
        scope.getToastPosition = function() {
          sanitizePosition();
          return Object.keys(scope.toastPosition)
            .filter(function(pos) { return scope.toastPosition[pos]; })
            .join(' ');
        };
        function sanitizePosition() {
          var current = scope.toastPosition;
          if ( current.bottom && last.top ) current.top = false;
          if ( current.top && last.bottom ) current.bottom = false;
          if ( current.right && last.left ) current.left = false;
          if ( current.left && last.right ) current.right = false;
          last = angular.extend({},current);
        }

        scope.showActionToast = function(boardToDelete) {
          var pinTo = scope.getToastPosition();
          var toast = $mdToast.simple()
            .textContent('Board deleted')
            .action('UNDO')
            .highlightAction(true)
            .highlightClass('md-accent')// Accent is used by default, this just demonstrates the usage.
            .position(pinTo);
          $mdToast.show(toast).then(function(response) {
            if ( response == 'ok' ) {
              // alert('You clicked the \'UNDO\' action.');
              console.log("undo action clicked");
              Board.restoreState();
            } else {
              console.log("response: ", response);
              var user = Authentication.user.username;
              Board.deleteBoard(user, boardToDelete);
            }
          });
        };

        scope.closeToast = function() {
          $mdToast.hide();
        };
        scope.showConfirm = function($event) {
          // Appending dialog to document.body to cover sidenav in docs app
          var confirm = $mdDialog.confirm()
            .title('Are you sure you want to delete this board? All lists associated with this board will be lost.')
            .targetEvent($event)
            .ok('Yes')
            .cancel('Cancel');
          $mdDialog.show(confirm).then(function() {
            console.log("ev: ", $event);
            console.log("Authentication.user.username: ", Authentication.user.username);
            var user = Authentication.user.username;
            boardToDelete = scope.boardName;
            Board.saveState(boardToDelete);
            scope.showActionToast(boardToDelete);
            // Board.deleteBoard(user, boardToDelete);


          }, function() {
            scope.status = 'You decided to keep your debt.';
          });
        };

      },
      templateUrl: 'modules/boards/client/views/board.html'
    };
    return directive;
  }
}());
