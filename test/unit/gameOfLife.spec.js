var Grid = function (nbColumn, nbRows) {
    this.nbColumn = nbColumn;
    this.nbRows = nbRows;
    this.cells = buildCells(nbColumn, nbRows);

    function buildCells(nbColumn, nbRows)  {
        var cells = [], row = [];
        for (var i = 0; i < nbColumn; i++) {
            var row = [];
            for (var j = 0; j < nbRows; j++) {
                row[j] = {alive: false};
            }
            cells[i] = row;
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
    return new Grid(this.nbColumn, this.nbRows);
};

describe('a grid', function()  {

    it('should be a two dimensional grid', function() {
        var grid = new Grid(4, 8);

        expect(grid.nbColumn).toBe(4);
        expect(grid.nbRows).toBe(8);
    });

    it('should be created with dead cells', function() {
        var grid = new Grid(2, 2);

        expect(grid.cells).toEqual([[{alive: false}, {alive: false}], [{alive: false}, {alive: false}]]);
    });
});



describe('a cell', function() {

    it('should die if it has fewer than two live neighbours, as if caused by underpopulation', function() {
        var grid = new Grid(2, 2);
        grid.giveLife(1, 1);

        grid = grid.nextGeneration();

        expect(grid.isAlive(1, 1)).toBeFalsy;
    });

    it('should live if it has more than one live neighbours', function() {
        var grid = new Grid(2, 2);
        grid.giveLife(1, 1);
        grid.giveLife(1, 2);
        grid.giveLife(2, 1);

        grid = grid.nextGeneration();

        expect(grid.isAlive(1, 1)).toBeTruthy;
    });
});