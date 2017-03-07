import chai from 'chai';
import chaiEnzyme from 'chai-enzyme';
import dirtyChai from 'dirty-chai';

chai.use(chaiEnzyme()); // Note the invocation at the end
chai.use(dirtyChai);
