(function() {
    'use strict';

    angular
        .module('libreriaApp')
        .controller('AuthorController', AuthorController);

    AuthorController.$inject = ['$scope', '$state', 'Author', 'BookAuthor', 'ParseLinks', 'AlertService', 'paginationConstants', 'pagingParams'];

    function AuthorController ($scope, $state, Author, BookAuthor, ParseLinks, AlertService, paginationConstants, pagingParams) {
        var vm = this;

        vm.loadPage = loadPage;
        vm.predicate = pagingParams.predicate;
        vm.reverse = pagingParams.ascending;
        vm.transition = transition;
        vm.itemsPerPage = paginationConstants.itemsPerPage;
        vm.showBook = function(author){
        	if(author.isSelected === undefined || author.isSelected === false){
	        	author.books = BookAuthor.query({
	                page: pagingParams.page - 1,
	                size: vm.itemsPerPage,
	                id: author.id
	            });
	        	author.isSelected = true;
        	}else{
        		author.isSelected = false;
        	}
        }
        
        vm.isSelected = function (author){
        	if(author.isSelected)
        		return true;
        	else
        		return false;
        }
        
        loadAll();

        function loadAll () {
            Author.query({
                page: pagingParams.page - 1,
                size: vm.itemsPerPage,
                sort: sort()
            }, onSuccess, onError);
            function sort() {
                var result = [vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc')];
                if (vm.predicate !== 'id') {
                    result.push('id');
                }
                return result;
            }
            function onSuccess(data, headers) {
                vm.links = ParseLinks.parse(headers('link'));
                vm.totalItems = headers('X-Total-Count');
                vm.queryCount = vm.totalItems;
                vm.authors = data;
                vm.page = pagingParams.page;
            }
            function onError(error) {
                AlertService.error(error.data.message);
            }
        }

        function loadPage(page) {
            vm.page = page;
            vm.transition();
        }

        function transition() {
            $state.transitionTo($state.$current, {
                page: vm.page,
                sort: vm.predicate + ',' + (vm.reverse ? 'asc' : 'desc'),
                search: vm.currentSearch
            });
        }
    }
})();
