import { Dropdown, Menu, Space, Typography } from 'antd';
import { FC } from 'react';
import Logo from '../../../../assets/svg/logo.svg?react';
import BigArrowDown from '../../../../assets/svg/big_arrow_down.svg?react';
import SmallUser from '../../../../assets/svg/small_user.svg?react';
import BigUser from '../../../../assets/svg/big_user.svg?react';
import { Header } from 'antd/es/layout/layout';
import MenuItem from 'antd/es/menu/MenuItem';
import Settings from '../../../../assets/svg/settings.svg?react';
import Logout from '../../../../assets/svg/logout.svg?react';

const { Title } = Typography;

export const MainHeader: FC = () => {
	const MenuItemsStops = (
		<Menu>
			<MenuItem key="1">Суверный</MenuItem>
			<MenuItem key="2">Суверный</MenuItem>
		</Menu>
	);

	const MenuItems = (
		<Menu>
			<MenuItem key="1">1</MenuItem>
			<MenuItem key="2">2</MenuItem>
		</Menu>
	);

	const MenuItemsUser = (
		<Menu>
			<MenuItem disabled key="1">
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
		<Header
			style={{
				display: 'flex',
				backgroundColor: 'white',
				borderRadius: '20px',
				justifyContent: 'space-between',
				width: '1000px',
				boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.16)',
			}}
		>
			<Space style={{ paddingTop: '15px' }}>
				<Logo />
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
							<BigArrowDown style={{ paddingTop: '35px' }} />
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
							<BigArrowDown color="353535" style={{ paddingTop: '35px' }} />
						</Space>
					</a>
				</Dropdown>

				<Dropdown overlay={MenuItemsStops} trigger={['click']}>
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
							<BigArrowDown color="353535" style={{ paddingTop: '35px' }} />
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
	);
};
