import Ember from 'ember';

/*
 * bind-style helper
 *
 * @example {{bind-style background-image="myImageProperty" width=10}}
 * @note Adapted from https://www.gituhb.com/yderidde/bindstyle-ember-helper
 */

export default function bindStyle(params, attrs, options) {
  Ember.assert("You must specify at least one hash argument to bindStyle", !!Ember.keys(attrs).length);

  var fmt = Ember.String.fmt;
  var view = this;
  var element = options.element;
  var attrKeys = Ember.keys(attrs).filter((item) =>
    (item.indexOf("unit") === -1) && (item !== "static"));

  // For each attribute passed, create an observer and emit the
  // current value of the property as an attribute.
  attrKeys.forEach((attr) => {
    var property = attrs[attr];

    Ember.assert(fmt("You must provide an expression as the value of bound attribute." +
                     "You specified: %@=%@", [attr, property]), (typeof property === 'string'));

    var propertyUnit = attrs[attr+"-unit"] || attrs["unit"] || '';
    var lazyValue = view.getStream(property);
    var value = lazyValue.value();

    var scheduleUpdate = view._wrapAsScheduled(() => {
      var result = lazyValue.value();
      var elem = view.$(element);

      Ember.assert(fmt("Attributes must be numbers, strings or booleans, not %@", [value]),
        ['null', 'undefined', 'number', 'string', 'boolean'].contains(typeof value));

      if (attr === 'background-image') {
        result = `url('${result}')`;
      }

      elem.css(attr, result + "" + propertyUnit);
    });

    scheduleUpdate(); // Initial state
    lazyValue.subscribe(scheduleUpdate); // Trigger on any updates
  });
}
