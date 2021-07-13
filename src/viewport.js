class Viewport {
  constructor(xView, yView, viewportWidth, viewportHeight, worldWidth, worldHeight) {
    // position of camera (top-left coord)
    this.xView = xView;
    this.yView = yView;

    // distance from followed object to border before cam moves
    this.xDeadZone = 0;
    this.yDeadZone = 0;

    // viewport dimensions
    this.viewportWidth = viewportWidth;
    this.viewportHeight = viewportHeight;

    // allow camera to move in vert/horizontal axis
    this.axis = 2;

    this.followed = null;
  }
}