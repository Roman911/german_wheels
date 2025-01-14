import { FC } from 'react';

import disk1x from '../../../assets/catalog-map/disk.jpg';
import disk2x from '../../../assets/catalog-map/disk_2x.jpg';
import disk3x from '../../../assets/catalog-map/disk_3x.jpg';

interface Props {
	className?: string;
}

const CatalogMapTire: FC<Props> = ({ className = '' }) => (
	<picture>
		<img
			src={ disk1x }
			srcSet={ `${ disk1x } 1x, ${ disk2x } 2x, ${ disk3x } 3x` }
			width='460'
			height='200'
			alt='Disk image'
			className={ className }
		/>
	</picture>
);

export default CatalogMapTire;
