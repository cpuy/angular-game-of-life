'use strict';

angular.module('directive.grid', [])
    .directive('gameOfLifeGrid', function() {
        return {
            restrict: 'E',
            templateUrl: 'gameOfLifeGrid.html'
        };
    })
