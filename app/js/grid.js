'use strict';

/**
 * Created by colin on 05/05/14.
 */
angular.module('service.grid', [])
    .factory('gridService', function () {

        var create = function (nbColumn, nbRows) {
            var cells = [], i = 0, j = 0;
            for (i = 0; i < nbRows; i++) {
                cells[i] = [];
                for (j = 0; j < nbColumn; j++) {
                    cells[i].push({alive: false});
                }
            }
            return cells;
        };

        var toggleLife = function(cell) {
            cell.alive = !cell.alive;
        };

        return {
            create: create,
            toggleLife: toggleLife
        };
    });