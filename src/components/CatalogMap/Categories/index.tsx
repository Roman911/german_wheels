import { useAppTranslation } from '../../../hooks';
import { Link } from '../../../lib';
import * as Images from '../../Lib/Images';

export const Categories = () => {
	const t = useAppTranslation();

	return <div className='mt-2.5 grid grid-cols-1 md:grid-cols-3 gap-5'>
		<Link to='tyre' className='relative rounded-md group transition duration-300 overflow-hidden'>
			<Images.CatalogMapTire className='transition-transform duration-300 group-hover:scale-125' />
			<div
				className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold group-hover:text-blue-300 group-hover:underline'>
				{ t('tires', true) }
			</div>
		</Link>
		<Link to='disc' className='relative rounded-md group transition duration-300 overflow-hidden'>
			<Images.CatalogMapDisk className='transition-transform duration-300 group-hover:scale-125' />
			<div
				className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold group-hover:text-blue-300 group-hover:underline'>
				{ t('disks', true) }
			</div>
		</Link>
		<Link to='car' className='relative rounded-md group transition duration-300 overflow-hidden'>
			<Images.CatalogMapCar className='transition-transform duration-300 group-hover:scale-125' />
			<div
				className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-2xl font-bold group-hover:text-blue-300 group-hover:underline'>
				{ t('cars', true) }
			</div>
		</Link>
	</div>
};
