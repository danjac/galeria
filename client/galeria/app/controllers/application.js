import Ember from 'ember';

const {
  service
} = Ember.inject;

export default Ember.Controller.extend({

  session: service('session'),
  currentUser: service('currentUser'),
  alerts: service('alerts'),

  actions: {
    dismissAlert(msg) {
      console.log(msg);
//this.get('alerts').remove(msg);
    },
    invalidateSession() {
      this.get('session').invalidate();
    }
  }
});
