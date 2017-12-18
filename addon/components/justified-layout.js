import Component from '@ember/component';
import layout from '../templates/components/justified-layout';
import justifiedLayout from 'justified-layout';
import { computed } from '@ember/object';
import { get, set, getProperties } from '@ember/object';
import { schedule } from '@ember/runloop';

export default Component.extend({
  layout,
  attributeBindings: ['style'],

  style: computed('height', function() {
    return `height: ${get(this, 'height')}px;`;
  }),

  justifiedImages: computed('images.[]', function() {
    let images = get(this, 'images');
    let imageSizes = get(this, 'images').map(image => {
      return getProperties(image, 'width', 'height');
    });

    let calcuations = justifiedLayout(imageSizes, get(this, 'options'));

    schedule('afterRender', () => {
      set(this, 'height', calcuations.containerHeight);
    });

    return calcuations.boxes.map((box, index) => {
      return {
        image: images.objectAt(index),
        box,
      };
    });
  }),
});
