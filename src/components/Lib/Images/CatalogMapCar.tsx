import { FC } from 'react';

import car1x from '../../../assets/catalog-map/car.jpg';
import car2x from '../../../assets/catalog-map/car_2x.jpg';
import car3x from '../../../assets/catalog-map/car_3x.jpg';

interface Props {
	className?: string;
}

const CatalogMapTire: FC<Props> = ({ className = '' }) => (
	<picture>
		<img
			src={ car1x }
			srcSet={ `${ car1x } 1x, ${ car2x } 2x, ${ car3x } 3x` }
			width='460'
			height='200'
			alt='Care image'
			className={ className }
		/>
	</picture>
);

export default CatalogMapTire;
