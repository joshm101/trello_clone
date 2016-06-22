(function() {
  'use strict';
  angular
    .module('boards')
    .service('Board', Board);

    Board.$inject = ['$rootScope', '$http', '$mdDialog', '$mdSidenav'];

    function Board ($rootScope, $http) {
      var service = {
        boards: [],

        getBoards: function (user) {
          if (typeof user !== 'undefined') {
            $http.get('api/boards/get_boards', user)
              .then(function (response) {
                console.log("response.data: ", response.data);
                service.boards = response.data;
                console.log("service.boards: ", service.boards);
                $rootScope.$broadcast ( 'boards.update' );

              });
          }
        },

        createBoard: function (boardName) {
          console.log("boardName createBoard: ", boardName);
          $http.post('/api/boards/create', { name: boardName })
            .success(function (board, res) {
              service.boards.push(board);
              $rootScope.$broadcast( 'boards.update' );
            });
        },

        deleteBoard: function(user, boardName) {
          $http.post('/api/boards/delete_board', {user: user, boardName: boardName})
            .success(function (res, err) {
              console.log("res is: ", res);
              var index;
              for (var i = 0; i < service.boards.length; ++i) {
                if (service.boards[i].name === boardName) {
                  index = i;
                }
              }
              service.boards.splice(index, 1);
              $rootScope.$broadcast( 'boards.update' );
            });
        },

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
        chunk: function (arr, size) {
          var newArray = [];
          for (var i = 0; i < arr.length; i += size) {
            newArray.push (arr.slice (i, i+ size));
          }
          return newArray;
        }
      };

      return service;
    }

}());

