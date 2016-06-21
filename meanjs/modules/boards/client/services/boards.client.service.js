(function() {
  'use strict';
  angular
    .module('boards')
    .service('Board', Board);

    Board.$inject = ['$rootScope', '$http', '$mdDialog', '$mdSidenav'];

    function Board ($rootScope, $http) {
      var service = {
        boards: [],

        addBoard: function (boardName) {
          if (boardName.length > 0) {
            $http.post('/api/boards/create', { name: boardName })
              .success(function(board, res) {
                service.boards.push(board);
              });
          }
        },

        getBoards: function (user) {
          if (typeof user !== 'undefined') {
            $http.get('api/boards/get_boards', user)
              .then(function (response) {
                console.log("response.data: ", response.data);
                //service.boards.length = 0;
                /*
                for (var i = 0; i < response.data.length; ++i) {
                  service.boards.push (response.data[i]);
                }*/
                service.boards = response.data;
                console.log("service.boards: ", service.boards);
                $rootScope.$broadcast ( 'boards.update' );


              });
          }
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

