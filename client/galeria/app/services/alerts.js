import Ember from 'ember';

export default Ember.Service.extend({
  messages: null,

  init() {
    this._super(...arguments);
    this.set('messages', []);
  },

  add(message, type) {
    const msg = Ember.Object.create({
      message: message,
      type: type,
      isVisible: true
    });

    Ember.run.later(this, () => {
      msg.set('isVisible', false);
      this.get('messages').removeObject(msg);
    }, 3000);
    this.get('messages').pushObject(msg);
  },

  remove(msg) {
    this.get('messages').removeObject(msg);
  }

});
