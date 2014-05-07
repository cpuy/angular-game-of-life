'use strict';

angular.module('controller.grid', ['service.grid'])
    .controller('GridCtrl', [ '$scope', '$interval', 'gridService', function ($scope, $interval, gridService) {
        $scope.grid = gridService.create(12, 12);

        $scope.toggleLife = function (cell) {
            gridService.toggleLife(cell);
        };

        $scope.nextGeneration = function () {
            $interval(computeNextGeneration, 600);
        };

        function computeNextGeneration() {
            $scope.grid = gridService.nextGeneration($scope.grid);
        };
    }]);