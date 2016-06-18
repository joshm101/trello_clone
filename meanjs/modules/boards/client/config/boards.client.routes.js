/* (function() {
  'use strict';

  angular
    .module('boards.routes')
    .config(boardRouteConfig);

  boardRouteConfig.$inject = ['$stateProvider', '$urlRouterProvider'];

  function boardRouteConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.rule(function ($injector, $location) {
      var path = $location.path();
      var hasTrailingSlash = path.length > 1 && path[path.length -1] === '/';

      if (hasTrailingSlash) {
        // if last character is a slash, return the same url without the slash
        var newPath = path.substr(0, path.length - 1);
        $location.replace().path(newPath);
      }
    });
  }
});
*/
