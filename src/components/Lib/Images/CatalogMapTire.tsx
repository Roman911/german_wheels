import { FC } from 'react';

import tire1x from '../../../assets/catalog-map/tire.jpg';
import tire2x from '../../../assets/catalog-map/tire_2x.jpg';
import tire3x from '../../../assets/catalog-map/tire_3x.jpg';

interface Props {
	className?: string;
}

const CatalogMapTire: FC<Props> = ({ className = '' }) => (
	<picture>
		<img
			src={ tire1x }
			srcSet={ `${ tire1x } 1x, ${ tire2x } 2x, ${ tire3x } 3x` }
			width='460'
			height='200'
			alt='Tire image'
			className={ className }
		/>
	</picture>
);

export default CatalogMapTire;
