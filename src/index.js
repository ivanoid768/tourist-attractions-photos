import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import { redirectIfDisqusAccessToken } from './common/disqus'
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { Provider as ReduxProvider } from 'react-redux';
import store from './redux/store';

const client = new ApolloClient({
	uri: "http://localhost:4000/graphql"
});

redirectIfDisqusAccessToken()

ReactDOM.render((
	<ReduxProvider store={store}>
		<ApolloProvider client={client}>
			<Router basename={process.env.PUBLIC_URL}>
				<Route path="/" component={App} />
			</Router>
		</ApolloProvider>
	</ReduxProvider>
), document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
