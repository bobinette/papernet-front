import { Map, fromJS } from 'immutable';

import chai from 'chai';
import chaiImmutable from 'chai-immutable';

import paper from 'src/paper/reducer';

chai.use(chaiImmutable);
const expect = chai.expect;

describe('reducer', () => {
  it('handles RECEIVE_PAPER', () => {
    const initialState = Map();
    const action = {
      type: 'RECEIVE_PAPER',
      paper: Map({
        title: 'Pizza yolo',
      }),
    };

    const nextState = paper(initialState, action);
    expect(nextState).to.equal(fromJS({
      paper: {
        title: 'Pizza yolo',
      },
      loading: false,
      found: true,
    }));
  });

  it('handles RECEIVE_PAPER with plain JS payload', () => {
    const initialState = Map();
    const action = {
      type: 'RECEIVE_PAPER',
      paper: {
        title: 'Pizza yolo',
      },
    };

    const nextState = paper(initialState, action);
    expect(nextState).to.equal(fromJS({
      paper: {
        title: 'Pizza yolo',
      },
      loading: false,
      found: true,
    }));
  });

  it('handles RECEIVE_PAPER without initial state', () => {
    const action = {
      type: 'RECEIVE_PAPER',
      paper: {
        title: 'Pizza yolo',
      },
    };

    const nextState = paper(undefined, action);
    expect(nextState).to.equal(fromJS({
      paper: {
        title: 'Pizza yolo',
      },
      loading: false,
      found: true,
    }));
  });
});
