import Ember from 'ember';

const {
  service
} = Ember.inject;

export default Ember.Controller.extend({
  alerts: service('alerts'),

  actions: {
    submit() {
      const model = this.get('model');
      model.set('image', document.getElementById('image-field').files[0]);

      model
        .save()
        .then(() => {
          this.get('alerts').add('Your image has been uploaded!', 'success');
          this.transitionToRoute('images', {
            queryParams: {
              page: 1
            }
          });
        });
    }
  }
});
