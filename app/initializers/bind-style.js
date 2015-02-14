import bindStyle from 'addon/bind-style';

export default {
  name: 'bind-style',
  initialize: function () {
    Ember.HTMLBars.makeBoundHelper(bindStyle);
  }
};
