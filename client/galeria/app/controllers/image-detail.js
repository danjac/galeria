import Ember from 'ember';

const {
  service
} = Ember.inject;

export default Ember.Controller.extend({

  currentUser: service('currentUser'),
  alerts: service('alerts'),

  isOwner: function() {
    const image = this.get('model');
    const currentUser = this.get('currentUser');
    return currentUser.user && parseInt(currentUser.user.id) === image.get('user');

  }.property('model'),

  actions: {
    deleteImage() {
      this.get('alerts')
        .add('Your image has been deleted', 'success');
      this.get('model')
        .destroyRecord()
        .then(() => this.transitionToRoute('images'));
    }
  }

});
