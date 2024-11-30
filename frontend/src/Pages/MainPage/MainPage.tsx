import { MainHeader, Order } from './Components';
import { Content } from 'antd/es/layout/layout';

export const MainPage = () => {
	return (
		<>
			<Content style={{ display: 'flex', gap: '20px', position:"absolute", paddingTop:"20px", paddingLeft:"20px"}}>
				<Order />
				<MainHeader />
			</Content>
		</>
	);
};
