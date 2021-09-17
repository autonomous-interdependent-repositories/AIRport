import App from './App.svelte';
import { marker } from './frame'

var test = marker

const app = new App({
	target: document.body,
	props: {
		name: 'world'
	}
});

export default app;