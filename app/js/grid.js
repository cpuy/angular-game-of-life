'use strict';

/**
 * Created by colin on 05/05/14.
 */
angular.module('service.grid', [])
    .factory('gridService', function () {

        var Cell = function () {
            return { alive: false };
        };

        var Grid = function (nbColumns, nbRows) {
            this.nbColumns = nbColumns || 12;
            this.nbRows = nbRows || 12;
            this.cells = [];

            this.countAliveNeighbours = function (columnIdx, rowIdx) {
                var count = 0;
                for (var i = columnIdx - 1; i <= columnIdx + 1; i++) {
                    for (var j = rowIdx - 1; j <= rowIdx + 1; j++) {
                        if (!(i == columnIdx && j == rowIdx) && this.isAlive(i, j)) {
                            count += 1;
                        }
                    }
                }
                return count;
            };

            this.isAlive = function (columnIdx, rowIdx) {
                return this.cells[columnIdx] && this.cells[columnIdx][rowIdx] && this.cells[columnIdx][rowIdx].alive;
            };

            for (var i = 0; i < nbRows; i++) {
                this.cells[i] = createColumn();
            }

            function createColumn() {
                var column = [], j = 0;
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
            var nextGenGrid = new Grid(grid.nbColumns, grid.nbColumns);

            for (var i = 0; i < grid.nbRows; i++) {
                for (var j = 0; j < grid.nbColumns; j++) {
                    if (shouldBeAlive(i, j)) {
                        nextGenGrid.cells[i][j].alive = true;
                    }
                }
            }
            return nextGenGrid;

            function shouldBeAlive(i, j) {
                count = grid.countAliveNeighbours(i, j);
                if (count === 3 || (grid.cells[i][j].alive && count === 2)) {
                    return true;
                }
            }
        };

        return {
            create: createGrid,
            toggleLife: toggleLife,
            nextGeneration: nextGeneration
        };
    });