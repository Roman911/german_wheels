import { type MouseEvent, type SetStateAction, useRef, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { useAppDispatch, useAppTranslation, useClickOutside } from '../../../../../hooks';
import { resetFilter } from '../../../../../store/reducers/filterSlice';
import { Link } from '../../../../../lib';
import { CarDiskFilter } from './CarDiskFilter';
import { CarTireFilter } from './CarTireFilter';
import * as Icons from '../../../../Lib/Icons';
import { links } from '../../links';

export const HeaderMenu = () => {
	const [ open, setOpen ] = useState(false);
	const filterRef = useRef<HTMLDivElement>(null);
	const [ section, setSection ] = useState('tires');
	const dispatch = useAppDispatch();
	const t = useAppTranslation();

	const closeFilter = () => {
		setOpen(false);
	}

	useClickOutside({ ref: filterRef, open, onClose: closeFilter });

	const handleClick = (event: MouseEvent<HTMLButtonElement>, value: SetStateAction<string>) => {
		event.stopPropagation();
		setOpen(!(open && section === value));
		if(section !== value) {
			setSection(value);
		}
	};

	const ButtonMeu = ({ sectionItem, label }: { sectionItem: string, label: string }) => (
		<button
			type='button'
			onClick={ event => handleClick(event, sectionItem) }
			className={
				twMerge('inline-flex items-center gap-x-1.5 font-semibold group transition hover:text-blue-200 outline-none',
					(open && section === sectionItem) && 'text-blue-200'
				) }
		>
			<span>{ label }</span>
			<span className='transition'>
					<Icons.ChevronDownIcon
						width='14'
						height='14'
						strokeWidth='2'
						className={
							twMerge('stroke-white transition group-hover:stroke-blue-200',
								(open && section === sectionItem) && 'stroke-blue-200 rotate-180')
						}
					/>
				</span>
		</button>
	)

	return <div className='hidden lg:block'>
		<nav className='container mx-auto max-w-7xl flex justify-between items-center gap-8 p-5 pr-8 text-white text-lg'>
			{ [ { section: 'tires', label: t('cartires', true) }, { section: 'disks', label: 'Автодиски' } ]
				.map((item, i) => {
				return <ButtonMeu key={ i } sectionItem={ item.section } label={ item.label } />
			}) }
			{ links.map((item, index) => {
				return <Link key={ index } onClick={ () => dispatch(resetFilter()) }
										 className='font-semibold hover:text-blue-200' to={ item.url }>
					{ t(item.title, true) }
				</Link>
			}) }
			<div
				ref={ filterRef }
				className={ twMerge('absolute left-0 right-0 top-24 z-30 flex w-full -mt-0.5', !open && 'hidden') }>
				<div
					className='w-full overflow-hidden bg-zinc-900 shadow-lg ring-1 ring-gray-900/5 pt-8 pb-6 text-white font-normal'>
					<div className='flex-auto max-w-7xl grid grid-cols-4 mx-auto px-4'>
						{ section === 'tires' ? <CarTireFilter closeFilter={ closeFilter }/> :
							<CarDiskFilter closeFilter={ closeFilter }/> }
					</div>
				</div>
			</div>
		</nav>
	</div>
};
