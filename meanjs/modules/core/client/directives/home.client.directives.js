(function() {
  'use strict';
  angular
    .module("core")
    .directive("signUpButton", signUpButton)
    .directive('signInButton', signInButton);

  signUpButton.$inject = ['$rootScope', '$timeout', '$interpolate', '$state', '$window'];
  signInButton.$inject = ['$rootScope', '$timeout', '$interpolate', '$state', '$window'];
  function signUpButton ($rootScope, $timeout, $interpolate, $state, $window) {
    var directive = {
      restrict: 'E',
      transclude: true,
      templateUrl: 'modules/core/client/views/sign-up-button.html',
      link: function (scope, element, attr) {
        scope.signup = function($event) {
          $window.location.href = '/authentication/signup';
        }
      }

    };
    return directive;
  }

  function signInButton ($rootScope, $timeout, $interpolate, $state, $window) {
    var directive = {
      restrict: 'E',
      transclude: true,
      templateUrl: 'modules/core/client/views/sign-in-button.html',
      link: function (scope) {
        scope.signin = function($event) {
          $window.location.href = '/authentication/signin'
        }
      }
    };
    return directive;
  }




}());
