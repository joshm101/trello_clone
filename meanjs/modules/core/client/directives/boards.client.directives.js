(function () {
  'use strict';
  angular.module('core')
    .directive("boardsToolbar", boardsToolbar);

  boardsToolbar.$inject = ['$rootScope', '$timeout', '$interpolate', '$state'];
  function boardsToolbar($rootScope, $timeout, $interpolate, $state) {
    var directive = {
      restrict: 'E',
      transclude: true,
      templateUrl: 'modules/boards/client/views/boards-toolbar.html'
    };
    return directive;
  }
}());
