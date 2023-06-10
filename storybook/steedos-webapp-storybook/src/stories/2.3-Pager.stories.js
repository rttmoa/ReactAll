import React from 'react';
import Bootstrap from '../components/bootstrap'
import { Provider  } from 'react-redux';
import store from '../stores/configureStore'

import Pager from '../components/pager'

export default {
  title: 'Pager__Test',
};

class ExampleComponent extends React.Component {
	constructor(props) {
		super(props);

		this.handlePageChanged = this.handlePageChanged.bind(this);

		this.state = {
			total:       11,
			current:     7,
			visiblePage: 5,
		};
	}

	handlePageChanged(newPage) {
		this.setState({ current : newPage });
	}

	render() {
		return (
			<Pager
				total={this.state.total}
				current={this.state.current}
				visiblePages={this.state.visiblePage}
				titles={{ first: '<|', last: '|>' }}
				onPageChanged={this.handlePageChanged}
			/>
		);
	}
}


export const base封装分页 = () => (
  <Provider store={store}>
    <Bootstrap>
		<br /><br /><br /><br /><br /><br /><br /><br /><br />
      <ExampleComponent /> 
    </Bootstrap>
  </Provider>
)
