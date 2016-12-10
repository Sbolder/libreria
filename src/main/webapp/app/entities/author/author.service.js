(function() {
    'use strict';
    angular
        .module('libreriaApp')
        .factory('Author', Author);
    
    angular
    .module('libreriaApp').
    filter('ageFilter', calculateAge);
    
   


    Author.$inject = ['$resource', 'DateUtils'];

    function Author ($resource, DateUtils) {
        var resourceUrl =  'api/authors/:id';

        return $resource(resourceUrl, {}, {
            'query': { method: 'GET', isArray: true},
            'get': {
                method: 'GET',
                transformResponse: function (data) {
                    if (data) {
                        data = angular.fromJson(data);
                        data.birthDate = DateUtils.convertLocalDateFromServer(data.birthDate);
                    }
                    return data;
                }
            },
            'update': {
                method: 'PUT',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.birthDate = DateUtils.convertLocalDateToServer(copy.birthDate);
                    return angular.toJson(copy);
                }
            },
            'save': {
                method: 'POST',
                transformRequest: function (data) {
                    var copy = angular.copy(data);
                    copy.birthDate = DateUtils.convertLocalDateToServer(copy.birthDate);
                    return angular.toJson(copy);
                }
            }
        });
    }
    
    function calculateAge() {
        function calculateAge(birthday) { // birthday is a date
            var ageDifMs = Date.now() - (new Date(birthday)).getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }

        return function(birthdate) { 
              return calculateAge(birthdate);
        }; 
   }
})();
