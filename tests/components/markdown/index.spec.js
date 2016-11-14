import React from 'react';

import { mount } from 'enzyme';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

import EnricherMarkdown from 'src/components/markdown';

chai.use(chaiEnzyme()); // Note the invocation at the end
const expect = chai.expect;

describe('Enriched Markdown', () => {
  it('creates a Markdown div', () => {
    const enrichedMarkdown = mount(<EnricherMarkdown text="Pizza Yolo" />);

    expect(enrichedMarkdown.find('.Markdown')).to.be.present();
  });
});
