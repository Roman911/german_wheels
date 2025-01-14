import { FC, Fragment } from 'react';

import { Title } from '../../Lib';
import { Link } from '../../../lib';

interface Brand {
	name: string;
	manufacturer_id: number;
	sort_order: string;
	types: number;
	image: string;
	updated_at: string;
	created_at: string;
	alias: string;
	status: number;
	brand_id: number;
}

interface BrandsObject {
	data: {
		[key: string]: Brand[];
	}
}

export const List: FC<BrandsObject> = ({ data }) => {
	return <div className='mt-4'>
		<Title title={ 'Виробники шин' } />
		<div className='columns-2 md:columns-4'>
			{ Object.entries(data).map(([letter, brands], index) => {
				return <Fragment key={ index }>
					<div className='text-lg font-bold mb-1'>{ letter }</div>
					{ brands.map((brand, i) => {
						return <Link
							key={ i }
							className='block text-base hover:text-blue-300 hover:underline'
							to={ `tyre/${brand.manufacturer_id}` }
						>
							{ brand.name }
						</Link>
					}) }
				</Fragment>
			}) }
		</div>
	</div>
};
