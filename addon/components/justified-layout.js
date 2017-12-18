import Component from '@ember/component';
import layout from '../templates/components/justified-layout';
import justifiedLayout from 'justified-layout';
import { computed } from '@ember/object';
import { get, getProperties } from '@ember/object';

export default Component.extend({
  layout,

  justifiedImages: computed('images.[]', function() {
    let images = get(this, 'images');
    let imageSizes = get(this, 'images').map(image => {
      return getProperties(image, 'width', 'height');
    });
    return justifiedLayout(imageSizes).boxes.map((box, index) => {
      return {
        image: images.objectAt(index),
        box,
      };
    });
  }),
});
