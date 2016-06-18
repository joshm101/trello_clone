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
}());
