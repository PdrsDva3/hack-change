import { Button, Select, Space, Typography } from 'antd';
import { Content } from 'antd/es/layout/layout';
import { useEffect, useState } from 'react';
import { api } from '../../../../api/api';

const { Title } = Typography;

interface OrderInfo {
	taxi: number;
	time1: number;
	time2: number;
	price: number;
	cap1: number;
	cap2: number;
}

interface Stop {
	stopName: string;
	id: number;
	lat:string;
	lon:string;
	address: string;
}

export const Order = () => {
	const [orderData, setOrderData] = useState<OrderInfo | null>(null);
	const [stops, setStops] = useState<Stop[]>([]);
	const [selectedDeparture, setSelectedDeparture] = useState<string | null>(null);
	const [selectedArrival, setSelectedArrival] = useState<string | null>(null);

	useEffect(() => {
		const fetchStops = async () => {
			try {
				const response = await api.get('dot/all');
				const data = response.data;
				setOrderData(data);
			} catch (error) {
				console.error('Error fetching stops:', error);
			}
		};

		fetchStops();
	}, []);

	const formatStopData = (stop: Stop) => ({
		value: stop.id,
		label: `${stop.stopName}`,
		adr: stop.address,
	});

	const handleSubmit = async () => {
		if (!selectedDeparture || !selectedArrival) {
			alert('Пожалуйста, выберите оба пункта назначения');
			return;
		}

		try {
			const response = await api.post('dot/all', {
				departureId: selectedDeparture,
				arrivalId: selectedArrival,
			});
			const data = response.data;
			setOrderData(data);
		} catch (error) {
			console.error('Error submitting order:', error);
			alert('Не удалось оформить заказ. Проверьте подключение к интернету.');
		}
	};

	useEffect(() => {
		const fetchStops = async () => {
			try {
				const response = await api.get('dot/all');
				const data = response.data;
				console.log(data.dots)
				setStops(data.dots);
			} catch (error) {
				console.error('Error fetching stops:', error);
			}
		};

		fetchStops();
	}, []);

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
				paddingTop: '20px',
				paddingBottom:'20px'
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
						options={stops}
						value={selectedDeparture}
						onChange={(value) => setSelectedDeparture(value as string | null)}
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
					Место прибытия:
				</Title>
				<Space>
					<Select
						style={{ width: '200px' }}
						placeholder="Выберите причал"
						options={Object.values(stops).map((stop) => formatStopData(stop))}
						value={selectedArrival}
						onChange={(value) => setSelectedArrival(value as string | null)}
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
					width: '160px',
					paddingTop: '15px',
				}}
			>
				<Title
					level={5}
					style={{ fontSize: '20px', color: 'white', fontFamily: 'Acrom' }}
				>
					Посмотреть
				</Title>
			</Button>

			<Button
				danger
				onClick={handleSubmit}
				disabled={!orderData}
				type="primary"
				style={{
					display: 'flex',
					justifyContent: 'center',
					alignItems: 'center',
					width: '160px',
					paddingTop: '15px',
				}}
			>
				<Title
					level={1}
					style={{ fontSize: '20px', color: '#353535', fontFamily: 'Acrom' }}
				>
					Заказать
				</Title>
			</Button>

			{orderData && (
				<>
					<Space style={{ display: 'flex' }}>
						<Title style={{ fontFamily: 'Acrom', color: '#353535', fontSize: '16px' }}>
							Такси
						</Title>
						<Title style={{ fontFamily: 'Acrom', color: 'red', fontSize: '16px' }}>
							{orderData.taxi}
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
								~{orderData.time1} мин
							</Title>
						</Space>

						<Space
							style={{ display: 'flex', width: '300px', justifyContent: 'space-between' }}
						>
							<Title style={{ color: '#353535', fontFamily: 'Acrom', fontSize: '16px' }}>
								Время в пути:
							</Title>
							<Title style={{ color: '#989898', fontFamily: 'Acrom', fontSize: '16px' }}>
								~{orderData.time2} мин
							</Title>
						</Space>

						<Space
							style={{ display: 'flex', width: '300px', justifyContent: 'space-between' }}
						>
							<Title style={{ color: '#353535', fontFamily: 'Acrom', fontSize: '16px' }}>
								Цена поездки
							</Title>
							<Title style={{ color: '#989898', fontFamily: 'Acrom', fontSize: '16px' }}>
								{orderData.price} руб.
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
								{orderData.cap1}%
							</Title>
						</Space>

						<Space
							style={{ display: 'flex', width: '300px', justifyContent: 'space-between' }}
						>
							<Title style={{ color: '#353535', fontFamily: 'Acrom', fontSize: '16px' }}>
								Загруженность такси:
							</Title>
							<Title style={{ color: '#33A200', fontFamily: 'Acrom', fontSize: '16px' }}>
								{orderData.cap2}%
							</Title>
						</Space>
					</Space>
				</>
			)}
		</Content>
	);
};
