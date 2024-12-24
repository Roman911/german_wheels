import { FC } from 'react';

import { Link } from '../../../../../../lib';
import { useAppDispatch, useAppSelector, useAppTranslation } from '../../../../../../hooks';
import { setCarFilter } from '../../../../../../store/reducers/filterCarSlice';
import { changeSubsection } from '../../../../../../store/reducers/filterSlice';
import { LinkComponent } from '../LinkComponent';
import { typeDiskLinks, brandsLinks, carBrandsLinks, diameterLinks } from './links';
import { Subsection } from '../../../../../../models/filter';
import { Title } from '../Title';

interface CarDiskFilterProps {
	closeFilter?: () => void
}

export const CarDiskFilter: FC<CarDiskFilterProps> = ({ closeFilter }) => {
	const t = useAppTranslation();
	const dispatch = useAppDispatch();
	const { filter } = useAppSelector(state => state.filterCarReducer);

	const handleClick = (brand: number) => {
		dispatch(setCarFilter({ ...filter, brand }));
		dispatch(changeSubsection(Subsection.ByCars));
		if(closeFilter) {
			closeFilter();
		}
	}

	return <>
		<div>
			<Title title={ t('by disk type', true) } />
			{typeDiskLinks.map(item => {
				return <LinkComponent
					key={ item.label }
					to={ item.to }
					label={ t(item.label, true) }
					mt={ item.mt }
					onClick={ closeFilter }
				/>
			})}
		</div>
		<div>
			<Title title={ t('by brands', true) } />
			<div className='mt-6 mb-6 grid grid-cols-2 gap-y-4 gap-x-2'>
				{brandsLinks.map(item => {
					return <LinkComponent
						key={ item.label }
						to={ item.to }
						label={ t(item.label, true) }
						onClick={ closeFilter }
					/>
				})}
			</div>
			<Link to='/catalog/disks' onClick={ closeFilter } className='text-blue-200 font-bold hover:underline'>
				{t('all brands', true)}
			</Link>
		</div>
		<div className='mt-6 lg:mt-0'>
			<Title title={ t('by car brands', true) } />
			<div className='mt-6 mb-6 grid grid-cols-2 gap-y-4 gap-x-2'>
				{carBrandsLinks.map(item => {
					return <LinkComponent
						key={ item.label }
						to={ item.to }
						label={ t(item.label, true) }
						onClick={ () => handleClick(item.brand) }
					/>
				})}
			</div>
			<Link to='/catalog/disks' onClick={ closeFilter } className='text-blue-200 font-bold hover:underline'>
				{t('all car brands', true)}
			</Link>
		</div>
		<div className='mt-6 lg:mt-0'>
			<div>
				<Title title={ t('by diameter', true) } />
				<div className='mt-6 mb-6 grid grid-cols-4 gap-1.5 max-w-64 pr-2.5'>
					{diameterLinks.map(item => {
						return <LinkComponent
							key={ item.label }
							to={ item.to }
							border={ item.border }
							label={ t(item.label, true) }
							onClick={ closeFilter }
						/>
					})}
				</div>
			</div>
		</div>
	</>
};
