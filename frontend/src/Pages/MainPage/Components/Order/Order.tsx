import { Button, Select, Space, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';

const { Title } = Typography;

export const Order = () => {
	const StopsArray = ['Северный', 'КуКУ', 'Ботанический сад', 'Китай город'];

	return (
		<Content
			style={{
				display: 'flex',
				flexDirection: 'column',
				backgroundColor: 'white',
				borderRadius: '20px',
				alignItems: 'center',
				width: '360px',
				boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.16)',
				gap: '20px',
			}}
		>
			<Space
				style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
			>
				<Title
					level={1}
					style={{ fontSize: '20px', color: '#353535', fontFamily: 'Acrom' }}
				>
					Место отправления:
				</Title>
				<Space>
					<Select
						style={{ width: '200px' }}
						placeholder="Выберите причал"
						options={StopsArray.map((stops) => {
							return {
								value: stops,
							};
						})}
					/>
				</Space>
			</Space>

			<Space
				style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
			>
				<Title
					level={1}
					style={{ fontSize: '20px', color: '#353535', fontFamily: 'Acrom' }}
				>
					Место отправления:
				</Title>
				<Space>
					<Select
						style={{ width: '200px' }}
						placeholder="Выберите причал"
						options={StopsArray.map((stops) => {
							return {
								value: stops,
							};
						})}
					/>
				</Space>
			</Space>
			<Button
				danger
				type="primary"
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					paddingBottom: '10px',
					width: '120px',
				}}
			>
				<Title
					level={1}
					style={{ fontSize: '20px', color: 'white', fontFamily: 'Acrom' }}
				>
					Заказать
				</Title>
			</Button>

			<Space style={{ display: 'flex' }}>
				<Title style={{ fontFamily: 'Acrom', color: '#353535', fontSize: '16px' }}>
					Такси
				</Title>
				<Title style={{ fontFamily: 'Acrom', color: 'red', fontSize: '16px' }}>
					№342628
				</Title>
			</Space>

			<Space style={{ display: 'flex', flexDirection: 'column', gap: '0.1px' }}>
				<Space
					style={{ display: 'flex', width: '300px', justifyContent: 'space-between' }}
				>
					<Title style={{ color: '#353535', fontFamily: 'Acrom', fontSize: '16px' }}>
						Время ожидания:
					</Title>
					<Title style={{ color: '#989898', fontFamily: 'Acrom', fontSize: '16px' }}>
						~6 мин.
					</Title>
				</Space>

				<Space
					style={{ display: 'flex', width: '300px', justifyContent: 'space-between' }}
				>
					<Title style={{ color: '#353535', fontFamily: 'Acrom', fontSize: '16px' }}>
						Время в пути:
					</Title>
					<Title style={{ color: '#989898', fontFamily: 'Acrom', fontSize: '16px' }}>
						~15 мин.
					</Title>
				</Space>

				<Space
					style={{ display: 'flex', width: '300px', justifyContent: 'space-between' }}
				>
					<Title style={{ color: '#353535', fontFamily: 'Acrom', fontSize: '16px' }}>
						Цена поездки
					</Title>
					<Title style={{ color: '#989898', fontFamily: 'Acrom', fontSize: '16px' }}>
						150 руб.
					</Title>
				</Space>
			</Space>

			<Space
				style={{
					display: 'flex',
					flexDirection: 'column',
					gap: '0.1px',
					paddingBottom: '20px	',
				}}
			>
				<Space
					style={{ display: 'flex', width: '300px', justifyContent: 'space-between' }}
				>
					<Title style={{ color: '#353535', fontFamily: 'Acrom', fontSize: '16px' }}>
						Загруженность причала:
					</Title>
					<Title style={{ color: '#F47544', fontFamily: 'Acrom', fontSize: '16px' }}>
						56%
					</Title>
				</Space>

				<Space
					style={{ display: 'flex', width: '300px', justifyContent: 'space-between' }}
				>
					<Title style={{ color: '#353535', fontFamily: 'Acrom', fontSize: '16px' }}>
						Загруженность такси:
					</Title>
					<Title style={{ color: '#33A200', fontFamily: 'Acrom', fontSize: '16px' }}>
						12%
					</Title>
				</Space>
			</Space>
		</Content>
	);
};
