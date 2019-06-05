import Controller from '@ember/controller';
import { set } from '@ember/object';
import { A } from '@ember/array';

const imageSizes = [
  [150, 200],
  [500, 200],
  [250, 250],
  [200, 250],
  [300, 200],
  [200, 368],
  [408, 203],
  [160, 210],
  [768, 1024],
  [1024, 768],
];

export default Controller.extend({
  init() {
    this._super(...arguments);
    set(
      this,
      'images',
      A(
        imageSizes.map(image => {
          let [width, height] = image;
          return {
            width,
            height,
            url: `https://www.fillmurray.com/${width}/${height}`,
          };
        })
      )
    );
  },
});
