import { MainHeader, Order } from './Components';
import { Content } from 'antd/es/layout/layout';

export const MainPage = () => {
	return (
		<>
			<Content style={{ display: 'flex', gap: '30px' }}>
				<Order />
				<MainHeader />
			</Content>
		</>
	);
};
