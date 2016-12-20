import React, { PropTypes, Component } from 'react';
import ImmutablePropTypes from 'react-immutable-proptypes';
import { Link } from 'react-router';

import { paperPropType } from 'utils/constants';

import FormField from 'components/field/form';
import NavBar from 'components/navbar';

import PaperListViewRow from 'home/components/row';

import './view.scss';

const generateForm = onSearch => ({
  type: 'list',
  valueKey: [],
  extra: { className: 'col-md-10 offset-md-1' },
  children: [
    {
      type: 'text',
      valueKey: ['title'],
      extra: {
        className: 'ImportView__Title',
        placeholder: 'Title...',
        label: 'Title',
      },
    },
    {
      type: 'button',
      valueKey: [],
      extra: {
        className: 'offset-md-5 col-md-2',
        label: 'Search',
        onClick: onSearch,
      },
    },
  ],
});

class ImportView extends Component {

  static propTypes = {
    imports: ImmutablePropTypes.contains({
      filters: ImmutablePropTypes.contains({
        title: PropTypes.string,
      }),
      list: ImmutablePropTypes.listOf(paperPropType).isRequired,
    }).isRequired,
    onSearch: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);

    this.state = { form: generateForm(props.onSearch) };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.onSearch !== this.props.onSearch) {
      this.setState({ form: generateForm(nextProps.onSearch) });
    }
  }

  render() {
    const { imports, onChange } = this.props;
    const { form } = this.state;

    return (
      <div className="container">
        <NavBar
          items={[
            {
              element: <Link className="nav-link" to={'/papers'}>Home</Link>,
              active: false,
            },
            {
              element: <Link className="nav-link" to={'/imports'}>Imports</Link>,
              active: true,
            },
          ]}
        />
        <div className="ImportView__Content">
          <FormField
            form={form}
            onChange={onChange}
            value={imports.get('filters')}
          />
          <ul className="col-xs-12 container">
            {imports.get('list').map((paper, i) => (
              <li className="col-md-10 offset-md-1" key={i} >
                <PaperListViewRow paper={paper} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }
}

export default ImportView;
