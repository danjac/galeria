import Ember from 'ember';

export default Ember.Component.extend({
  prevClass: function() {
    const model = this.get('model');
    return 'previous' + (model.meta.previous ? '' : ' disabled');

  }.property('model'),

  nextClass: function() {
    const model = this.get('model');
    return 'next' + (model.meta.next ? '' : ' disabled');
  }.property('model'),

});
