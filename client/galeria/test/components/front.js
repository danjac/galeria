import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount } from 'enzyme';

import { Front } from '../../src/components/front';

describe('<Front />', () => {
  it('calls componentDidMount', () => {
    spy(Front.prototype, 'componentDidMount');
    const actions = {
      getPopularImages() {},
    };
    mount(<Front images={[]} actions={actions} />);
    expect(Front.prototype.componentDidMount.calledOnce).to.equal(true);
  });
});
