import { FC } from 'react';

import { useAppTranslation } from '../../../../hooks';
import { MySelect } from '../Select';
import type { FilterProps } from '../../../../models/filterHomePage';

export const TiresFilter: FC<FilterProps> = ({ filters, onChange, onSubmit }) => {
	const t = useAppTranslation();

	return <>
		<div className='grid grid-cols-1 md:grid-cols-4 gap-2.5 md:mt-7'>
			{filters.map(item => {
				return <MySelect
					key={item.name}
					name={item.name}
					label={item.label}
					options={item.options}
					onChange={onChange}
					focusValue={item.focusValue}
				/>
			})}
		</div>
		<div className='mt-4 md:mt-10 flex justify-center'>
			<button onClick={() => onSubmit()} className='btn primary w-full md:w-72 uppercase'>
				{t('choose tires')}
			</button>
		</div>
	</>
}
