import { FC, ReactNode } from "react";
import classNames from "classnames";

import styles from "./index.module.scss";
import { CarFilterIcon, DiskIcon, TireIcon } from "../../../Lib/Icons";

import { Section } from '../../../../models/filter';

interface TabProps {
	children: ReactNode
	name: Section
	section: Section
	isOpen: boolean
	handleClick: (value: Section) => void
	label: string
}

const icons = {
	tires: TireIcon,
	disks: DiskIcon,
	car: CarFilterIcon,
	battery: CarFilterIcon,
	autoGoods: CarFilterIcon,
	services: CarFilterIcon,
};

export const Tab: FC<TabProps> = ({ children, name, section, isOpen, handleClick, label }) => {
	const Icon = icons[name];

	const iconClassNames = classNames('absolute left-5 inset-1/2 -translate-y-2/4 md:hidden', {
		'fill-[#99CFFF]': section !== name || !isOpen,
		'fill-white': section === name && isOpen,
		'stroke-[#99CFFF]': name === Section.Car && (section !== name || !isOpen),
		'stroke-white': name === Section.Car && (section === name && isOpen)
	});

	const tabClassNames = classNames(styles.tab, 'w-full md:w-auto md:bg-transparent rounded-2xl', {
		'bg-blue-400': section !== name || !isOpen,
		'bg-[#005299]': section === name && isOpen,
		'mt-2.5 md:mt-0': name !== Section.Tires
	});

	const buttonClassNames = classNames(styles.link, 'text-base xl:text-xl font-bold md:mr-1.5 xl:mr-2.5 p-5 md:p-0 w-full md:w-auto relative', {
		'md:pointer-events-none': section === name && isOpen,
		'text-white': section === name && isOpen,
		'md:text-white': section === name
	});

	const contentClassNames = classNames('md:hidden px-5 pb-7', {
		'hidden': section !== name || !isOpen,
		'block': section === name && isOpen
	});

	return (
		<div className={ tabClassNames }>
			<button onClick={ () => handleClick(name) } className={ buttonClassNames }>
				<Icon className={ iconClassNames } />
				{ label }
			</button>
			<div className={ contentClassNames }>
				{ children }
			</div>
		</div>
	);
}
