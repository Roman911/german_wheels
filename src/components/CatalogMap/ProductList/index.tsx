import { FC } from 'react';

import { Title } from '../../Lib';
import { Link } from '../../../lib';

interface Item {
	alias: string
	manufacturer_id: number
	model_id: number
	model_id_trc: number
	name: string
	status: number
	types: number
}

interface BrandsObject {
	data: Item[]
	section: string | undefined
	title: string
}

export const ProductList: FC<BrandsObject> = ({ data, section, title }) => {
	const sectionTransform = section === 'tyre' ? 'tires' : 'disks';

	return <div className='mt-4'>
		<Title title={ title } />
		<div className='columns-2 md:columns-4'>
			{ data.map(item => {
				return <Link
					key={ item.model_id }
					to={ `/catalog/${ sectionTransform }/b-${ item.manufacturer_id }/m-${ item.model_id }` }
					className='block text-base hover:text-blue-300 hover:underline'
				>
					{ item.name }
				</Link>
			}) }
		</div>
	</div>
};
