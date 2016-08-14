import Model from 'ember-data/model';
import attr from 'ember-data/attr';
import {
  validator,
  buildValidations
} from 'ember-cp-validations';

const Validations = buildValidations({
  title: [
    validator('presence', true),
    validator('length', {
      min: 4
    })
  ],
  description: validator('presence', true)
});

export default Model.extend(Validations, {
  title: attr('string'),
  image: attr('file'),
  description: attr('string'),
  thumbnail: attr(),
  user: attr('number'),
  createdAt: attr('date')
});
