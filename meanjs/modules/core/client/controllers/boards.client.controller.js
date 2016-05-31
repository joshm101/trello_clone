(function () {
  'use strict';

  angular
    .module('core', ['ngMaterial'])

    .controller('BoardsController', ['$scope', '$mdDialog', '$mdSidenav', function($scope, $mdDialog, $mdSidenav){
      function buildToggler(navID) {
        return function() {
          // Component lookup should always be available since we are not using `ng-if`
          $mdSidenav(navID)
            .toggle()
        }
      }

      $scope.isOpenRight = function(){
        return $mdSidenav('right').isOpen();
      };

      $scope.toggleRight = buildToggler('right');

      $scope.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('right').close();
      };
    }])
    .controller('RightCtrl', function ($scope, $timeout, $mdSidenav, $log) {
      $scope.close = function () {
        // Component lookup should always be available since we are not using `ng-if`
        $mdSidenav('right').close()
          .then(function () {
            $log.debug("close RIGHT is done");
          });
      };
    });



  /*
  BoardsController.$inject = ['$scope', '$state', '$mdDialog', '$mdSidenav', 'Authentication', 'menuService'];

  function BoardsController($scope, $mdDialog, $mdSidenav) {
    var vm = this;

  }*/
}());
