import Component from '@ember/component';
import layout from '../templates/components/justified-layout';
import justifiedLayout from 'justified-layout';
import { computed } from '@ember/object';
import { get, set, getProperties } from '@ember/object';
import { schedule } from '@ember/runloop';
import { htmlSafe } from '@ember/string';
import { isEmpty } from '@ember/utils';

/**
  Pretty cool component, right?
  To use it, you could enter the following in your template:
  ```handlebars
  {{#justified-layout
    images=arrayOfImages
    options=(hash targetRowHeight=215 containerWidth=500 containerPadding=0 boxSpacing=5)
    as |image dimensions|
  }}
    <img src={{image.src}} style={{ddd}}>
  {{/justified-layout}}
  ```
  @class YUIDocComponent
  @public
*/

export default Component.extend({
  layout,
  attributeBindings: ['style'],

  containerWidth: null,
  containerPadding: 0,
  targetRowHeight: 320,
  boxSpacing: 10,
  targetRowHeightTolerance: 0.25,
  maxNumRows: Number.POSITIVE_INFINITY,
  forceAspectRatio: false,
  showWidows: true,
  fullWidthBreakoutRowCadence: false,

  style: computed('height', function() {
    return htmlSafe(`height: ${get(this, 'height')}px;position:relative;`);
  }),

  didInsertElement() {
    this._super(...arguments);
    if (this.containerWidth === null) {
      set(this, 'containerWidth', this.element.parentElement.clientWidth);
    }
  },

  justifiedImages: computed('images.[]', 'containerWidth', function() {
    let images = get(this, 'images');

    if (isEmpty(images)) {
      return [];
    }

    let imageSizes = get(this, 'images').map(image => {
      return getProperties(image, 'width', 'height');
    });

    let options = getProperties(
      this,
      'containerWidth',
      'containerPadding',
      'targetRowHeight',
      'boxSpacing',
      'targetRowHeightTolerance',
      'maxNumRows',
      'forceAspectRatio',
      'showWidows',
      'fullWidthBreakoutRowCadence'
    );
    console.log('hejhej options', options);

    let calcuations = justifiedLayout(imageSizes, options);

    schedule('afterRender', () => {
      set(this, 'height', calcuations.containerHeight); // eslint-disable-line ember/no-side-effects
    });

    return calcuations.boxes.map((box, index) => {
      return {
        image: images.objectAt(index),
        box,
      };
    });
  }),
});
