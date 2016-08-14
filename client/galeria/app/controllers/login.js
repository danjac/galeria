import Ember from 'ember';

export default Ember.Controller.extend({
  session: Ember.inject.service(),
  actions: {
    authenticate() {
      const creds = this.getProperties('identification', 'password');
      this.get('session').authenticate('authenticator:token', creds);
    }
  }
});
