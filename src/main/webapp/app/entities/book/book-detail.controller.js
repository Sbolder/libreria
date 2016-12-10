(function() {
    'use strict';

    angular
        .module('libreriaApp')
        .controller('BookDetailController', BookDetailController);

    BookDetailController.$inject = ['$scope', '$rootScope', '$stateParams', '$uibModalInstance', 'DataUtils', 'entity', 'Book', 'Author'];

    function BookDetailController($scope, $rootScope, $stateParams, $uibModalInstance, DataUtils, entity, Book, Author) {
        var vm = this;

        vm.book = entity;
        vm.byteSize = DataUtils.byteSize;
        vm.openFile = DataUtils.openFile;
        vm.clear = clear;

        var unsubscribe = $rootScope.$on('libreriaApp:bookUpdate', function(event, result) {
            vm.book = result;
        });
        $scope.$on('$destroy', unsubscribe);
        
        function clear () {
            $uibModalInstance.dismiss('cancel');
        }
        
    }
})();