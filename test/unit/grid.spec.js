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

            for (var i = 0; i < aGrid.nbRows; i++) {
                for (var j = 0; j < aGrid.nbColumns; j++) {
                    expect(aGrid[i][j].alive).toBeFalsy();
                }
            }
        });
    });

    describe('Any dead cell', function () {
        it('can be resurrect', function () {
            var aGrid= grid.create(2, 2);

            grid.toggleLife(aGrid[1][1]);

            expect(aGrid[1][1].alive).toBeTruthy();
        });

        it('should becomes a live cell if it has exactly three live neighbours', function () {
            var aGrid= grid.create(3, 3);
            aGrid[1][1].alive = false;
            aGrid[0][0].alive = true;
            aGrid[0][1].alive = true;
            aGrid[0][2].alive = true;

            aGrid = grid.nextGeneration(aGrid);

            expect(aGrid[1][1].alive).toBeTruthy();
        });

    });

    describe('Any live cell', function () {
        it('can be killed', function () {
            var aGrid = grid.create(2, 2);
            aGrid[1][1].alive = true;

            grid.toggleLife(aGrid[1][1]);

            expect(aGrid[1][1].alive).toBeFalsy();
        });

        it('should dies if it has fewer than two live neighbours, as if caused by underpopulation.', function() {
            var aGrid = grid.create(2, 2);
            aGrid[0][0].alive = true;
            aGrid[0][1].alive = true;

            aGrid = grid.nextGeneration(aGrid);

            expect(aGrid[0][0].alive).toBeFalsy();
            expect(aGrid[0][1].alive).toBeFalsy();
        });

        it('should live if it has more than two live neighbours', function() {
            var aGrid = grid.create(2, 2);
            aGrid[0][0].alive = true;
            aGrid[1][0].alive = true;
            aGrid[0][1].alive = true;

            aGrid = grid.nextGeneration(aGrid);

            expect(aGrid[0][0].alive).toBeTruthy();
        });

        it('should die if it has more than three live neighbours, as if by overcrowding', function() {
            var aGrid = grid.create(3, 3);
            aGrid[1][1].alive = true;
            aGrid[0][0].alive = true;
            aGrid[0][1].alive = true;
            aGrid[0][2].alive = true;
            aGrid[1][2].alive = true;

            aGrid = grid.nextGeneration(aGrid);

            expect(aGrid[1][1].alive).toBeFalsy();
        });

        it('should live if it has two live neighbours', function() {
            var aGrid = grid.create(3, 3);
            aGrid[1][1].alive = true;
            aGrid[0][0].alive = true;
            aGrid[0][1].alive = true;

            aGrid = grid.nextGeneration(aGrid);

            expect(aGrid[1][1].alive).toBeTruthy();
        });

        it('should live if it has three live neighbours', function() {
            var aGrid = grid.create(3, 3);
            aGrid[1][1].alive = true;
            aGrid[0][0].alive = true;
            aGrid[0][1].alive = true;
            aGrid[1][0].alive = true;

            aGrid = grid.nextGeneration(aGrid);

            expect(aGrid[1][1].alive).toBeTruthy();
        });
    });
});