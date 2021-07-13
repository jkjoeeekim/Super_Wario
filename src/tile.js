class Tile {
  constructor(x, y) {
    this.height = 16;
    this.width = 16;
    this.x = x;
    this.y = y;
    this.viewportDiff = 0;
    this.maxRender = 180;
    this.passable = true;
  }

  generateEmptyTiles(map, tile, context) {
    for (let x = tile.x; x < 1200; x += tile.width) {
      for (let y = tile.y; y < tile.maxRender; y += tile.height) {
        let newTile = new Tile(x, y);
        console.log(context.canvas.offsetWidth)
        map.emptyPieces.push(newTile);
      }
    }
  }
}

module.exports = Tile;