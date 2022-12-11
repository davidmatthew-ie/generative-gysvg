/**
 * A plugin to add useful functionality for generative artists.
 * 
 * @param {object} gySVG 
 * @param {object} gySVGObject
 */
function generative(gySVG, gySVGObject) {
  Object.assign(gySVG, {
    /**
     * Constrains (or clamps) a value between a minimum and maximum value.
     * 
     * @param {number} num The number to constrain.
     * @param {number} min The minimum limit.
     * @param {number} max The maximum limit.
     * @returns {number} The constrained number.
     */
    constrain(num, min, max) {
      let n = Math.min(Math.max(num, min), max);
      return n;
    },
    /**
     * Calculates the distance between two points using the Pythagorean theorem.
     * 
     * @param {number} x1 The first x co-ordinate.
     * @param {number} y1 The first y co-ordinate.
     * @param {number} x2 The second x co-ordinate.
     * @param {number} y2 The second y co-ordinate.
     * @returns {number} The distance between (x1, y1) and (x2, y2).
     */
    dist(x1, y1, x2, y2) {
      let a = x1 - x2;
      let b = y1 - y2;
      let c = Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
      return c;
    },
    /**
     * Interpolates linearly between two values. Returns the midway point (0.5) by default.
     * 
     * @param {number} start The first value.
     * @param {number} stop The second value.
     * @param {number} amount The amount of interpolation, between 0.0 and 1.0.
     * @returns {number} The interpolated value.
     */
    interp(start, stop, amount = 0.5) {
      let n = amount * (stop - start) + start;
      return n;
    },
    /**
     * Re-maps a number from one range to another.
     *
     * @param {number} value The value to be converted.
     * @param {number} start1 The lower bound of the current range.
     * @param {number} stop1 The upper bound of the current range.
     * @param {number} start2 The lower bound of the target range.
     * @param {number} stop2 The upper bound of the target range.
     * @returns {number} The remapped number.
     */
    mapRange(value, start1, stop1, start2, stop2) {
      let n = (value - start1) / (stop1 - start1) * (stop2 - start2) + start2;
      return n;
    },
    /**
     * Gets a random number between a minimum and maximum value.
     * 
     * @param {number} min Result is equal to or higher than this.
     * @param {number} max Result is lower than this.
     * @param {boolean} integer Default is true. Set to false to return a float.
     * @returns {number} The randomised integer.
     */
    random(min, max, integer = true) {
      let random = Math.random() * (max - min) + min;
      let number = integer ? Math.floor(random) : random;
      return number;
    }
  });
  Object.assign(gySVGObject.prototype, {
    /**
     * Tracks the pointer (mouse or touch) and creates cursorX and cursorY attributes to store their values.
     * 
     * @chainable
     * @returns {object} gySVGObject
     */
    trackCursor() {
      let point = this.el.createSVGPoint();
      this.el.setAttribute('cursorX', 0);
      this.el.setAttribute('cursorY', 0);
      this.el.addEventListener('pointermove', (event) => {
        this.el.style.touchAction = 'none';
        point.x = event.clientX;
        point.y = event.clientY;
        let transformedPoint = point.matrixTransform(this.el.getScreenCTM().inverse());
        this.el.setAttribute('cursorX', Math.ceil(transformedPoint.x));
        this.el.setAttribute('cursorY', Math.ceil(transformedPoint.y));
      });
      this.el.addEventListener('pointerleave', () => {
        this.el.style.touchAction = 'auto';
      });
      return this;
    }
  });
}

export { generative };
