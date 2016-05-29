import React from 'react';
import { expect } from 'chai';
import { spy } from 'sinon';
import { mount, shallow } from 'enzyme';

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
  it('shows Mine! if owner', () => {
    const images = [
      {
        id: 100,
        title: 'test',
        description: 'test',
        thumbnail: { url: 'test.jpg' },
        isOwner: true,
      },
    ];
    expect(shallow(<Front images={images} actions={{}} />).contains('Mine!'));
  });
});
