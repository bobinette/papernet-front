import React from 'react';
import TestUtils from 'react-addons-test-utils';

import { expect } from 'tests/chai';

import Checkbox from 'components/ui/checkbox';

describe('Checkbox', function() {
  it('prints the label', function() {
    // Render a checkbox with label in the document
    var checkbox = TestUtils.renderIntoDocument(
      <Checkbox label='yolo' />
    );

    var label = TestUtils.findRenderedDOMComponentWithClass(checkbox, 'CheckBox__Label');
    expect(label.textContent).to.equal('yolo');
  });

  it('is not checked by default', () => {
    var checkbox = TestUtils.renderIntoDocument(
      <Checkbox label='yolo' />
    );

    var input = TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input');
    expect(input.checked).to.equal(false);
  });

  it('sends a boolean to onChange', () => {
    var checked = null;
    const onChange = (c) => {checked = c;};

    var checkbox = TestUtils.renderIntoDocument(
      <Checkbox label='yolo' onChange={onChange} />
    );

    // Simulate a click and verify that it is now checked
    var input = TestUtils.findRenderedDOMComponentWithTag(checkbox, 'input');
    TestUtils.Simulate.change(input, {'target': {'checked': true}});
    expect(checked).to.equal(true);
  });
});
