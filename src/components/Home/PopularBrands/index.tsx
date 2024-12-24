import { FC } from 'react';

import { useAppDispatch, useAppSelector, useAppTranslation } from '../../../hooks';
import { Link } from '../../../lib';
import { PopularItem } from '../../Lib';

import { Car2BrandProps } from '../../../models/featureParams';
import { setCarFilter } from '../../../store/reducers/filterCarSlice';
import { changeSubsection } from '../../../store/reducers/filterSlice';
import { Subsection } from '../../../models/filter';

interface PopularBrandsProps {
	data: Car2BrandProps[] | undefined
}

export const PopularBrands: FC<PopularBrandsProps> = ({ data }) => {
	const dispatch = useAppDispatch();
	const { filter } = useAppSelector(state => state.filterCarReducer);
	const t = useAppTranslation();

	const handleClick = (brand: number) => {
		dispatch(setCarFilter({ ...filter, brand }));
		dispatch(changeSubsection(Subsection.ByCars));
	}

	return <>
		<div className='grid grid-cols-2 lg:grid-cols-6 mt-12 gap-x-5 mb-8'>
			{data?.map((item, index) => {
				return <PopularItem
					key={ index }
					label={item.name}
					link=''
					onClick={ () => handleClick(item.id) }
				/>
			})}
		</div>
		<Link
			onClick={() => dispatch(changeSubsection(Subsection.ByCars))}
			className='uppercase font-bold text-blue-500' to='/catalog/tires'
		>
			{t('show all')}
		</Link>
	</>
};
