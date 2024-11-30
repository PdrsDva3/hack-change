// import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './App.tsx';
import './styles/normalize.css';
import './styles/index.css';

import { BrowserRouter } from 'react-router-dom';
import { ConfigProvider } from 'antd';

createRoot(document.getElementById('root')!).render(
	<BrowserRouter>
		<ConfigProvider>
			<App />
		</ConfigProvider>
	</BrowserRouter>,
);
