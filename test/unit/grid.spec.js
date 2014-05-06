'use strict'

describe('game of life grid', function () {
    var grid;

    beforeEach(module('service.grid'));
    beforeEach(inject(function (gridService) {
        grid = gridService;
    }));

    describe('a grid', function () {

        it('should be created with dead cells', function () {
            var aGrid = grid.create(2, 2);

            aGrid.forEach(function(row) {
                row.forEach(function(cell) {
                    expect(cell.alive).toBeFalsy();
                });
            });
        });
    });

    describe('a cell', function () {
        it('can be resurrect', function () {
            var aGrid= grid.create(2, 2);

            grid.toggleLife(aGrid[1][1]);

            expect(aGrid[1][1].alive).toBeTruthy();
        });

        it('can be killed', function () {
            var aGrid = grid.create(2, 2);
            aGrid[1][1].alive = true;

            grid.toggleLife(aGrid[1][1]);

            expect(aGrid[1][1].alive).toBeFalsy();
        });
    });
});