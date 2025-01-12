import { FC, useState } from 'react';
import { twMerge } from 'tailwind-merge';

import { useAppDispatch, useAppTranslation } from '../../../hooks';
import { changeSection } from '../../../store/reducers/filterSlice';

import { Tab } from './Tab';
import { TiresFilter } from './TiresFilter';
import { DisksFilter } from './DisksFilter';
import { FilterByCar } from '../../../containers/Home/FilterByCar';

import { Section } from '../../../models/filter';
import type { Options } from '../../../models/baseData';
import type { OnChange } from '../../../models/filterHomePage';
import styles from './index.module.scss';

interface IFilterProps {
	section: Section
	data: {
		focusValue?: string
		label: string
		name: string
		options: Options[] | undefined
	}[]
	onChange: OnChange
	onSubmit: () => void
}

export const FilterComponent: FC<IFilterProps> = ({ data, section, onChange, onSubmit }) => {
	const [isOpen, setOpen] = useState(false);
	const dispatch = useAppDispatch();
	const t = useAppTranslation();

	const handleClick = (value: Section) => {
		const newOpenState = !(section === value && isOpen);
		setOpen(newOpenState);
		dispatch(changeSection(newOpenState ? value : Section.Tires));
	};

	const renderFilter = () => {
		switch(section) {
			case Section.Disks:
				return <DisksFilter filters={data} onChange={ onChange } onSubmit={ onSubmit } />;
			case Section.Car:
				return <FilterByCar/>;
			default:
				return <TiresFilter filters={data} onChange={ onChange } onSubmit={ onSubmit } />;
		}
	};

	return <section className={ twMerge(styles['home-filter'], styles[`home-filter__${ section }`]) }>
		<div className="mx-auto py-6 px-5 md:px-8 lg:py-16 xl:py-24 2xl:px-28 max-w-screen-2xl w-full">
			<div className={ twMerge('mt-2 md:mt-11 mb-8 flex justify-center gap-x-2.5') }>
				<Tab name={ Section.Tires } section={ section } isOpen={ isOpen } handleClick={ handleClick }
						 label={ t('tires') }/>
				<Tab name={ Section.Disks } section={ section } isOpen={ isOpen } handleClick={ handleClick }
						 label={ t('disks') }/>
				<Tab name={ Section.Car } section={ section } isOpen={ isOpen } handleClick={ handleClick }
						 label={ t('selection by car') }/>
			</div>
			<div className="">{ renderFilter() }</div>
		</div>
	</section>
}
