import { FC, Fragment } from 'react';

import { useAppDispatch, useAppSelector } from '../../../hooks';
import { Title } from '../../Lib';
import { Link } from '../../../lib';
import { setCarFilter } from '../../../store/reducers/filterCarSlice.ts';
import { changeSubsection } from '../../../store/reducers/filterSlice.ts';
import { Subsection } from '../../../models/filter.ts';

interface Brand {
	id: number
	name: string
	manufacturer_id: number
	sort_order: string
	types: number
	image: string
	updated_at: string
	created_at: string
	alias: string
	status: number
	brand_id: number
}

interface BrandsObject {
	data: {
		[key: string]: Brand[]
	}
	section: string | undefined
	title: string
}

export const BrandsList: FC<BrandsObject> = ({ data, section, title }) => {
	const { filter } = useAppSelector(state => state.filterCarReducer);
	const dispatch = useAppDispatch();

	const handleClick = (brand: number) => {
		dispatch(setCarFilter({ ...filter, brand }));
		dispatch(changeSubsection(Subsection.ByCars));
	}

	return <div className='mt-4'>
		<Title title={ title } />
		<div className='columns-2 md:columns-4'>
			{ Object.entries(data).map(([letter, brands], index) => {
				return <Fragment key={ index }>
					<div className='text-lg font-bold mb-1'>{ letter }</div>
					{ brands.map((brand, i) => {
						if(section === 'car') {
							return <Link
								key={ i }
								onClick={ () => handleClick(brand.id) }
								className='block text-base hover:text-blue-300 hover:underline'
								to={ `/catalog/tires` }
							>
								{ brand.name }
							</Link>
						}

						return <Link
							key={ i }
							className='block text-base hover:text-blue-300 hover:underline'
							to={ `/catalog-map/${section}/${brand.manufacturer_id}` }
						>
							{ brand.name }
						</Link>
					}) }
				</Fragment>
			}) }
		</div>
	</div>
};
