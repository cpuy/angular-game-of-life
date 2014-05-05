'use strict';

var Grid = function () {
    this.nbColumn =  12;
    this.nbRows =  12;
    this.cells = buildCells(this.nbColumn, this.nbRows);

    function buildCells(nbColumn, nbRows)  {
        var cells = [], column = [];
        for (var i = 0; i < nbRows; i++) {
            var column = [];
            for (var j = 0; j < nbColumn; j++) {
                column[j] = {alive: false};
            }
            cells[i] = column;
        }
        return cells;
    };
}

Grid.prototype.isAlive = function(column, row) {
    return this.cells[column][row].alive;
};

Grid.prototype.giveLife = function(column, row) {
    this.cells[column][row].alive = true;
};

Grid.prototype.nextGeneration = function () {
    var that = this;
    var newGrid = new Grid();
    var cell;
    for (var i = 0; i< this.nbRows; i++) {
        for (var j = 0; j< this.nbColumn; j++) {
            var count = countAliveNeighbors(i, j);
            if (this.cells[i][j].alive) {

                if (count === 2 || count === 3) {
                    newGrid.cells[i][j].alive = true;
                }
            } else {
                if (count === 3) {
                    newGrid.cells[i][j].alive = true;
                }
            }
        }
    }
    return newGrid;

    function countAliveNeighbors(i, j) {
        var count = 0;
        if (that.cells[i-1]) {
            if (that.cells[i-1][j] && that.cells[i-1][j].alive) {
                count += 1;
            }
            if (that.cells[i-1][j-1] && that.cells[i-1][j-1].alive) {
                count += 1;
            }
            if (that.cells[i-1][j+1] && that.cells[i-1][j+1].alive) {
                count += 1;
            }
        }
        if (that.cells[i+1]) {
            if (that.cells[i+1][j] && that.cells[i+1][j].alive) {
                count += 1;
            }
            if (that.cells[i+1][j+1] && that.cells[i+1][j+1].alive) {
                count += 1;
            }
            if (that.cells[i+1][j-1] && that.cells[i+1][j-1].alive) {
                count += 1;
            }
        }
        if (that.cells[i][j+1] && that.cells[i][j+1].alive) {
            count += 1;
        }
        if (that.cells[i][j-1] && that.cells[i][j-1].alive) {
            count += 1;
        }
        return count;
    }
};

angular.module('gameOfLife.controllers', [])
  .controller('GridCtrl', [ '$scope', '$interval', 'grid', function($scope, $interval, grid) {
        $scope.grid = grid;

        $scope.toggleLife = function(cell) {
            cell.alive = !cell.alive;
        };

        $scope.nextGeneration = function() {
            $interval(loop, 600);
        };

        function loop(delay) {
                $scope.grid = $scope.grid.nextGeneration();
        };
  }])
  .service('grid', Grid);
