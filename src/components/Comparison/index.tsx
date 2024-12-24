import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import { useAppSelector, useAppTranslation } from '../../hooks';
import { Language } from '../../models/language';
import { CloseButton } from '../Lib';
import { ItemWrapper } from './ItemWrapper';
import { batteryParams, disksParams, tiresParams } from './params';
import type { Product } from '../../models/products';

interface ComparisonProps {
	defaultTab: string
	tires: Product[]
	cargo: Product[]
	disks: Product[]
	battery: Product[]
	resetEverything: () => void
	handleClick: (id: number) => void
	onClick: (offerId: number, section: string) => void
}

export const ComparisonComponent: FC<ComparisonProps> = (
	{
		defaultTab,
		tires,
		cargo,
		disks,
		battery,
		resetEverything,
		handleClick,
		onClick
	}) => {
	const [tab, setTab] = useState<string>('tires');
	const { lang } = useAppSelector(state => state.langReducer);
	const t = useAppTranslation();

	useEffect(() => {
		setTab(defaultTab);
	}, [defaultTab]);

	const tabRender = (name: string, length: number) => {
		return <button
			onClick={() => setTab(name)}
			className={
			classNames('font-semibold text-lg py-2 relative hover:text-[#575C66] group transition', {
				'text-blue-500': tab !== name,
				'text-[#575C66]': tab === name
			})
		}>
			{ t(name, true) } ({ length })
			<div className={
				classNames('w-full h-0.5 absolute bottom-0 group-hover:bg-[#575C66]',
					{ 'bg-[#575C66]': tab === name },
					{ 'bg-transparent': tab !== name }
				)
			}/>
		</button>
	}

	const paramsRender = (params: string[]) => {
		return (
			<>
				{params.map((item, index) => (
					<div key={index} className='pr-2.5 h-11 md:leading-[44px] border-b border-transparent'>
						{t(item, true)}:
					</div>
				))}
			</>
		);
	};

	return <section className='comparison mt-4 md:mt-8'>
		<div className='flex gap-x-4 md:gap-x-8 mb-6'>
			{ tires.length > 0 && tabRender('tires', tires.length) }
			{ cargo.length > 0 && tabRender('cargo', cargo.length) }
			{ disks.length > 0 && tabRender('disks', disks.length) }
			{ battery.length > 0 && tabRender('battery', battery.length) }
		</div>
		<div className='flex relative'>
			<div className='w-28 md:w-60 px-2'>
				<div className='relative pt-9 md:pt-2 pb-2'>
					{lang === Language.UA ? 'Скинути все' : 'Сбросить все'}
					<CloseButton handleClick={ resetEverything }/>
				</div>
				<div className='mt-48 md:mt-52 text-center md:text-end font-bold'>
					{ tab === 'tires' && paramsRender(tiresParams) }
					{ tab === 'cargo' && paramsRender(tiresParams) }
					{ tab === 'disks' && paramsRender(disksParams) }
					{ tab === 'battery' && paramsRender(batteryParams) }
				</div>
			</div>
			<div className='flex-1 w-[calc(100%-15rem)]'>
				<div className='flex overflow-x-auto overflow-y-hidden whitespace-nowrap max-w-full'>
					{ tab === 'tires' && <ItemWrapper characteristics={ tires } name={ 'tires' } tab={ tab } onClick={ onClick } handleClick={ handleClick } /> }
					{ tab === 'cargo' && <ItemWrapper characteristics={ cargo } name={ 'cargo' } tab={ tab } onClick={ onClick } handleClick={ handleClick } /> }
					{ tab === 'disks' && <ItemWrapper characteristics={ disks } name={ 'disks' } tab={ tab } onClick={ onClick } handleClick={ handleClick } /> }
					{ tab === 'battery' && <ItemWrapper characteristics={ battery } name={ 'battery' } tab={ tab } onClick={ onClick } handleClick={ handleClick } /> }
				</div>
			</div>
		</div>
	</section>
};
