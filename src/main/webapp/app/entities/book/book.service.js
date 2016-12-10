(function() {
    'use strict';
    angular
        .module('libreriaApp')
        .factory('Book', Book);
    
    angular
    .module('libreriaApp')
    .factory('BookAuthor', BookAuthor);

    Book.$inject = ['$resource'];
    BookAuthor.$inject = ['$resource'];

    function Book ($resource) {
        var resourceUrl =  'api/books/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'getByAuthor':{method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                    }
                    return data;
                }
            },
            'update': { method:'PUT' }
        });
    }
    
    function BookAuthor ($resource) {
        var resourceUrl =  'api/authors/:id/book';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true}
        });
    }
    
})();
