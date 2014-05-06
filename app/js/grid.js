'use strict';

/**
 * Created by colin on 05/05/14.
 */
angular.module('service.grid', [])
    .factory('gridService', function () {

        var Cell = function () {
            return { alive: false };
        };

        var Grid = function(nbColumns, nbRows) {
            this.nbColumns = nbColumns || 12;
            this.nbRows = nbRows || 12;

            for (var i = 0; i < nbRows; i++) {
                this[i] = createColumn();
            }

            function createColumn() {
                var column = {}, j = 0;
                for (j = 0; j < nbColumns; j++) {
                    column[j] = new Cell();
                }
                return column;
            };
        };

        var createGrid = function (nbColumns, nbRows) {
            return new Grid(nbColumns, nbRows);
        };

        var toggleLife = function (cell) {
            cell.alive = !cell.alive;
        };

        var nextGeneration = function (grid) {
            var count = 0;

            for (var i = 0; i < grid.nbRows; i++) {
                for (var j = 0; j < grid.nbColumns; j++) {
                    if (grid[i][j].alive) {
                        count += 1;
                    }
                }
            }

            if (count === 3 ) {
                return grid;
            } else {
                return new Grid(grid.nbColumns, grid.nbColumns);;
            }
        };

        return {
            create: createGrid,
            toggleLife: toggleLife,
            nextGeneration: nextGeneration
        };
    });