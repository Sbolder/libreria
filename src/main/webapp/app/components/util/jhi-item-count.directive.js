(function() {
    'use strict';

    var jhiItemCount = {
        template: '<div class="info">' +
                    'Visualizzando {{(($ctrl.page - 1) * $ctrl.itemsPerPage) == 0 ? 1 : (($ctrl.page - 1) * $ctrl.itemsPerPage + 1)}} - ' +
                    '{{($ctrl.page * $ctrl.itemsPerPage) < $ctrl.queryCount ? ($ctrl.page * $ctrl.itemsPerPage) : $ctrl.queryCount}} ' +
                    'di {{$ctrl.queryCount}} elementi.' +
                '</div>',
        bindings: {
            page: '<',
            queryCount: '<total',
            itemsPerPage: '<'
        }
    };

    angular
        .module('libreriaApp')
        .component('jhiItemCount', jhiItemCount);
})();
