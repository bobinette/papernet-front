import {Map, fromJS} from 'immutable';
import { expect } from 'tests/chai';

import paper from 'reducers/paper';

describe('reducer', () => {

  it('handles RECEIVE_PAPER', () => {
    const initialState = Map();
    const action = {
      type: 'RECEIVE_PAPER',
      paper: Map({
        title: 'Yolo tonight'
      })
    };

    const nextState = paper(initialState, action);
    expect(nextState).to.equal(fromJS({
      title: 'Yolo tonight'
    }));
  });

  it('handles RECEIVE_PAPER with plain JS payload', () => {
    const initialState = Map();
    const action ={
      type: 'RECEIVE_PAPER',
      paper: {
        title: 'Yolo tonight'
      }
    };

    const nextState = paper(initialState, action);
    expect(nextState).to.equal(fromJS({
      title: 'Yolo tonight'
    }));
  });

  it('handles RECEIVE_PAPER without initial state', () => {
    const action = {
      type: 'RECEIVE_PAPER',
      paper: {
        title: 'Yolo tonight'
      }
    };

    const nextState = paper(undefined, action);
    expect(nextState).to.equal(fromJS({
      title: 'Yolo tonight'
    }));
  });

});
