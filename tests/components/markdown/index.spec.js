import React from 'react';

import { mount } from 'enzyme';
import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';

import Markdown from 'src/components/markdown';

chai.use(chaiEnzyme()); // Note the invocation at the end
const expect = chai.expect;

describe('Enriched Markdown', () => {
  it('should return an empty div', () => {
    const md = '';

    const comp = mount(<Markdown text={md} />);
    expect(comp).to.have.tagName('div');
    expect(comp).to.have.className('Markdown');
  });

  it('should have a heading', () => {
    const md = '# Heading';

    const comp = mount(<Markdown text={md} />);
    expect(comp.find('div > h1')).to.be.present();
  });

  it('should render a simple paragraph', () => {
    const md = 'Some text';

    const comp = mount(<Markdown text={md} />);
    expect(comp.find('div > p')).to.be.present();
    expect(comp.find('div > p')).to.have.text('Some text');
  });

  it('should render emphasized text', () => {
    const md = '*bold* is nice';

    const comp = mount(<Markdown text={md} />);
    expect(comp.find('div > p')).to.be.present();
    expect(comp.find('div > p')).to.have.text('bold is nice');
    expect(comp.find('div > p').find('em')).to.be.present();
    expect(comp.find('div > p').find('em')).to.have.text('bold');
  });

  it('should render emphasized title', () => {
    const md = '## test of *bold* title';

    const comp = mount(<Markdown text={md} />);
    expect(comp.find('div > h2')).to.be.present();
    expect(comp.find('div > h2').find('em')).to.be.present();
  });

  it('should render inline code', () => {
    const md = 'some inline `code`';

    const comp = mount(<Markdown text={md} />);
    expect(comp.find('div > p')).to.be.present();
    expect(comp.find('div > p')).to.have.text('some inline code');
    expect(comp.find('div > p').find('code')).to.be.present();
    expect(comp.find('div > p').find('code')).to.have.text('code');
  });

  it('should render inline math', () => {
    const md = 'some inline $\delta$'; // eslint-disable-line no-useless-escape

    const comp = mount(<Markdown text={md} />);
    expect(comp.find('div > p')).to.be.present();
    // expect(comp.find('div > p')).to.match('some inline');
    expect(comp.find('div > p').find('code')).to.not.be.present();
  });
});
