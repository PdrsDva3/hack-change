import { Outlet } from 'react-router-dom';
import { Map } from '../';
import { FC } from 'react';

export const RootLayout:FC = () => {
	const apiKey = '72bf9370-d348-455f-8c66-127eb0ba35ec';
	return (
		<>
			<Map apiKey={apiKey} />
			<Outlet />
		</>
	);
};
