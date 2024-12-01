import React, { useEffect } from 'react';
import { load } from '@2gis/mapgl';
import './MapPage.scss';

interface MapProps {
	apiKey: string;
}

type CustomMap = {
	destroy(): void;
	setCenter(center: [number, number]): void;
};

export const Map: React.FC<MapProps> = ({ apiKey }) => {
	useEffect(() => {
		let map: CustomMap | null = null;
		load().then((mapglAPI) => {
			map = new mapglAPI.Map('map-container', {
				center: [37.617627, 55.755829],
				zoom: 13,
				key: apiKey,
			});
		});

		return () => {
			if (map && typeof map.destroy === 'function') {
				map.destroy();
			}
		};
	});

	return <div id="map-container" style={{ height: '800px' }}></div>;
};
