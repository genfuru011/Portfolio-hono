import { render } from 'solid-js/web';
import { Router, Route } from '@solidjs/router';
import App from './App.jsx';
import PostListPage from './pages/PostListPage.jsx';
import PostDetailPage from './pages/PostDetailPage.jsx';

render(() => (
	<Router>
		<Route path="/" component={App} />
		<Route path="/blog" component={PostListPage} />
		<Route path="/blog/:slug" component={PostDetailPage} />
	</Router>
), document.getElementById('root'));
