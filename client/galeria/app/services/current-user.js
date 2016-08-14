import Ember from 'ember';

const {
  service
} = Ember.inject;

export default Ember.Service.extend({
  session: service('session'),
  store: service(),

  getCurrentUser() {
    return new Ember.RSVP.Promise((resolve, reject) => {
      const token = this.get('session.data.authenticated.token');
      if (Ember.isEmpty(token)) {
        resolve();
      } else {
        return this.get('store')
          .findRecord('auth-user', 'me')
          .then(user => {
            this.set('user', user);
            resolve();
          }, reject);
      }
    });
  }
});
