'use strict';

/**
 * Created by colin on 05/05/14.
 */
angular.module('service.grid', [])
    .factory('gridService', function () {

        var Cell = function () {
            return { alive: false };
        };

        var create = function (nbColumn, nbRows) {
            var cells = [], i = 0;

            for (i = 0; i < nbRows; i++) {
                cells.push(createColumn());
            }
            return cells;

            function createColumn() {
                var column = [], j = 0;
                for (j = 0; j < nbColumn; j++) {
                    column.push(new Cell());
                }
                return column;
            };
        };

        var toggleLife = function (cell) {
            cell.alive = !cell.alive;
        };

        return {
            create: create,
            toggleLife: toggleLife
        };
    });