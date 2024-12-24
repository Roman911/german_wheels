import { FC } from 'react';

import { Link } from '../../../../../../lib';
import { useAppTranslation } from '../../../../../../hooks';
import { TypeCarLinks } from '../../../../../Lib/TypeCarLinks';
import { LinkComponent } from '../LinkComponent';
import { Title } from '../Title';
import { seasonLinks, brandsLinks, diameterLinks } from './links';

interface CarTireFilterProps {
	closeFilter?: () => void
}

export const CarTireFilter: FC<CarTireFilterProps> = ({ closeFilter }) => {
	const t = useAppTranslation();

	return <>
		<div>
			<Title title={ t('by season', true) } />
			{seasonLinks.map(item => {
				return <LinkComponent
					key={ item.label }
					to={ item.to }
					img={ item.img }
					label={ t(item.label, true) }
					mt={ item.mt }
					onClick={ closeFilter }
				/>
			})}
		</div>
		<div>
			<Title title={ t('by car type', true) } />
			<TypeCarLinks onClick={ closeFilter } section='header' />
		</div>
		<div className='mt-6 lg:mt-0'>
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
			<Link to='/catalog/tires' onClick={ closeFilter } className='text-blue-200 font-bold hover:underline'>
				{t('all brands', true)}
			</Link>
		</div>
		<div className='mt-6 lg:mt-0'>
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
	</>
};
