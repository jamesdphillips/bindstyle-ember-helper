import bindStyle from 'app/helpers/bind-style';
import Ember from 'ember';

module('BindStyleHelper');

/*
 * Schedule issue
 */

test('it binds given attributes', function() {
  Ember.run(() => {
    var view = Ember.View.create({ tagName: 'div' });
    var element = document.createElement('div');
    bindStyle.bind(view)({}, { 'background-color': 'red' }, { element: element });

    ok(element.hasAttributes());
  });
});
