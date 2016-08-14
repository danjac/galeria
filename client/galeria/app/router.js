import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('images', {
    path: '/'
  });
  this.route('login');
  this.route('upload');
  this.route('image-detail', {
    path: '/images/:id'
  });
});

export default Router;
