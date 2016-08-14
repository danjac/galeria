import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';


const {
  service
} = Ember.inject;


export default Ember.Route.extend(ApplicationRouteMixin, {
  currentUser: service('current-user'),
  session: service('session'),

  beforeModel() {
    return this._getCurrentUser();
  },

  sessionAuthenticated() {
    this._getCurrentUser()
      .then(() => {
        this.transitionTo('/');
      })
      .catch(() => this.get('session').invalidate());
  },

  _getCurrentUser() {
    return this.get('currentUser').getCurrentUser();
  }
});
