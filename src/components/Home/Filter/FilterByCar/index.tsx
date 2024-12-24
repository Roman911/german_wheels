import { FC } from 'react';
import classNames from 'classnames';

import { Link } from '../../../../lib';
import { useAppTranslation } from '../../../../hooks';
import { MySelect } from '../Select';
import type { Options } from '../../../../models/baseData';

interface FilterByCarProps {
	disabled: boolean
	filters: {
		label: string
		name: string
		options?: Options[]
		isDisabled?: boolean
	}[]
	onClick: () => void
	onChange: (name: string, value: number | string | undefined) => void
}

export const FilterByCarComponents: FC<FilterByCarProps> = ({ disabled, filters, onClick, onChange }) => {
	const t = useAppTranslation();

	const renderLink = (type: 'tires' | 'disk', title: string) => {
		return <Link
			to={ `/catalog/${ type }` }
			onClick={ onClick }
			className={classNames('btn secondary w-full md:w-56 uppercase', { 'pointer-events-none opacity-60': disabled })}
		>
			{ t(title) }
		</Link>
	}

	return <>
		<div className='grid grid-cols-1 md:grid-cols-2 gap-2.5 md:mt-7'>
			{filters.map(item => {
				return <MySelect key={item.name} name={item.name} label={item.label} options={item.options} onChange={onChange} isDisabled={item.isDisabled} />
			})}
		</div>
		<div className='mt-4 md:mt-10 flex gap-4 flex-col md:flex-row'>
			{ renderLink('tires', 'choose tires') }
			{ renderLink('disk', 'choose disks') }
		</div>
	</>
}
