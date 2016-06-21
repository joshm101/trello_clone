(function () {
  'use strict';

  angular
    .module('users')
    .controller('AuthenticationController', AuthenticationController);

  AuthenticationController.$inject = ['$scope', '$state', '$stateParams', '$http', '$location', '$window', 'Authentication', 'PasswordValidator'];

  function AuthenticationController($scope, $state, $stateParams, $http, $location, $window, Authentication, PasswordValidator) {
    var vm = this;

    vm.authentication = Authentication;
    vm.getPopoverMsg = PasswordValidator.getPopoverMsg;
    vm.signup = signup;
    vm.signin = signin;
    vm.callOauthProvider = callOauthProvider;

    // Get an eventual error defined in the URL query string:
    vm.error = $location.search().err;

    // If user is signed in then redirect back home
    if (vm.authentication.user) {
      $location.path('/');
    }

    function signup(isValid) {
      vm.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      $http.post('/api/auth/signup', vm.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        vm.authentication.user = response;

        console.log("state is: ", $state);

        console.log("$state.previous is: ", $state.previous);

        if (typeof $state.previous !== 'undefined') {
          if ($state.previous.state.name === '') {
            $state.go('boards');
          } else {
            $state.go($state.previous.state.name, $state.previous.params);
          }
        } else {

          $state.go('/boards');
        }

      }).error(function (response) {
        vm.error = response.message;
      });
    }

    function signin(isValid) {
      vm.error = null;

      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.userForm');

        return false;
      }

      $http.post('/api/auth/signin', vm.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        vm.authentication.user = response;

        if (typeof $state.previous !== 'undefined') {
          if ($state.previous.state.name === '') {
            $state.go('boards');
          } else {
            $state.go($state.previous.state.name, $state.previous.params);
          }
        } else {

          $state.go('/boards');
        }

      }).error(function (response) {
        vm.error = response.message;
      });
    }

    // OAuth provider request
    function callOauthProvider(url) {
      if ($state.previous && $state.previous.href) {
        url += '?redirect_to=' + encodeURIComponent($state.previous.href);
      }

      // Effectively call OAuth authentication route:
      $window.location.href = url;
    }
  }
}());
