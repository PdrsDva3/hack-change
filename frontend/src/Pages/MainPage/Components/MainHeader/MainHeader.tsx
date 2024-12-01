import { Button, Dropdown, Menu, Space, Typography } from 'antd';
import {
	FC,
	 useEffect,
	useState,
} from 'react';
import Logo from '../../../../assets/svg/logo.svg?react';
import BigArrowDown from '../../../../assets/svg/big_arrow_down.svg?react';
import SmallUser from '../../../../assets/svg/small_user.svg?react';
import BigUser from '../../../../assets/svg/big_user.svg?react';
import { Content, Header } from 'antd/es/layout/layout';
import MenuItem from 'antd/es/menu/MenuItem';
import Settings from '../../../../assets/svg/settings.svg?react';
import Logout from '../../../../assets/svg/logout.svg?react';
import { api } from '../../../../api/api';

const { Title } = Typography;

interface Stop  {
	stopName: string;
	id: string;
	cordinate:number[];
}

interface IMeme {
	id: number;
	name: string;
	meme: string;
}

export const MainHeader: FC = () => {
	const [memeState, setMemeState] = useState<IMeme | null>(null);

	const handleMeme = async () => {
		const meme = await api.get('meme/random');
		console.log(meme);
		setMemeState(meme.data);
	};

	const [stops, setStops] = useState<Stop[]>([]);

	useEffect(() => {
	  const fetchStops = async () => {
	    try {
	      const response = await api.get('', {});
	      const data = response.data;
	      setStops(data);
	    } catch (error) {
	      console.error('Error fetching stops:', error);
	    }
	  };

	  fetchStops();
	}, []);

	const formatStopData = (stops: Stop[]) => (
	  stops.map(stop => ({
	    key: stop.id,
	    label: `${stop.stopName} (${stop.cordinate.join(', ')})`,
	    coordinate: stop.cordinate || [],
	  }))
	);

	const MenuItems = (
		<Menu>
			<MenuItem key="1">1</MenuItem>
			<MenuItem key="2">2</MenuItem>
		</Menu>
	);

	const MenuItemsUser = (
		<Menu>
			<MenuItem key="1">
				<Space style={{ display: 'flex', flexDirection: 'column' }}>
					<BigUser />
					<Title style={{ fontSize: '22px', color: '#353535', fontFamily: 'Acrom' }}>
						Калинкин Денис
					</Title>
				</Space>
				<Space
					style={{ display: 'flex', flexDirection: 'column', justifyContent: 'left' }}
				>
					<Title style={{ fontSize: '16px', color: '#989898', fontFamily: 'Acrom' }}>
						Почта:
					</Title>
					<Title style={{ fontSize: '16px', color: '#989898', fontFamily: 'Acrom' }}>
						Телефон:
					</Title>
				</Space>
				<Space
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: '5px',
						paddingTop: '10px',
					}}
				>
					<Settings />
					<Title style={{ fontSize: '16px', color: '#989898', fontFamily: 'Acrom' }}>
						Настройки
					</Title>
				</Space>
				<Space
					style={{
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center',
						gap: '5px',
						paddingTop: '10px',
					}}
				>
					<Logout />
					<Title style={{ fontSize: '16px', color: '#989898', fontFamily: 'Acrom' }}>
						Выйти
					</Title>
				</Space>
			</MenuItem>
		</Menu>
	);

	return (
		<>
			<Header
				style={{
					display: 'flex',
					backgroundColor: 'white',
					borderRadius: '20px',
					justifyContent: 'space-between',
					width: '980px',
					boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.16)',
				}}
			>
				<Space style={{ paddingTop: '15px' }}>
					<Button type="link" onClick={handleMeme}>
						<Logo />
					</Button>
				</Space>
				<Space style={{ gap: '80px' }}>
					<Dropdown overlay={MenuItems} trigger={['click']}>
						<a onClick={(e) => e.preventDefault()}>
							<Space
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									gap: '15px',
								}}
							>
								<Title color="353535" style={{ fontSize: '16px', fontFamily: 'Acrom' }}>
									Пользователям
								</Title>
								<BigArrowDown />
							</Space>
						</a>
					</Dropdown>

					<Dropdown overlay={MenuItems} trigger={['click']}>
						<a onClick={(e) => e.preventDefault()}>
							<Space
								style={{
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									gap: '15px',
								}}
							>
								<Title color="353535" style={{ fontSize: '16px', fontFamily: 'Acrom' }}>
									Водителям
								</Title>
								<BigArrowDown color="353535" />
							</Space>
						</a>
					</Dropdown>

					<Dropdown overlay={<Menu items={formatStopData(stops)} />}>
					<a onClick={(e) => e.preventDefault()}>
						<Space
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								gap: '15px',
							}}
						>
							<Title color="353535" style={{ fontSize: '16px', fontFamily: 'Acrom' }}>
								Причалы
							</Title>
							<BigArrowDown color="353535"  />
						</Space>
					</a>
				</Dropdown>
				</Space>
				<Dropdown
					overlay={MenuItemsUser}
					trigger={['click']}
					overlayStyle={{ width: '300px' }}
				>
					<a onClick={(e) => e.preventDefault()}>
						<Space style={{ paddingTop: '15px' }}>
							<SmallUser style={{ paddingBottom: '8px' }} />
						</Space>
					</a>
				</Dropdown>
			</Header>
			{memeState && (
				<Content
					style={{
						position: 'absolute',
						top: '50%',
						left: '50%',
						minHeight: '500px',
						minWidth: '500px',

						fontWeight: 800,

					}}
				>
					<img src={`data:image/jpeg;base64,${memeState?.meme}`} alt="Base64 Photo" />
				</Content>
			)}
		</>
	);
};
