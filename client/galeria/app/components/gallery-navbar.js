import Ember from 'ember';

export default Ember.Component.extend({
  actions: {
    logout() {
      this.sendAction('logout');
    }
  }
});
