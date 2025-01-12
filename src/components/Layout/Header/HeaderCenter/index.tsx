import { useState, SetStateAction } from 'react';
import { twMerge } from 'tailwind-merge';
import styles from './index.module.scss';

import { useAppSelector, useAppTranslation } from '../../../../hooks';
import { Link } from '../../../../lib';
import { Search } from '../../../../containers/Layout/Header/Search';
import { Badge, Logo } from '../../../Lib';

import * as Icons from '../../../Lib/Icons';
import { HeaderMenu } from './Menu';
import { CarTireFilter } from './Menu/CarTireFilter';
import { CarDiskFilter } from './Menu/CarDiskFilter';
import { links } from '../links';

export const HeaderCenter = () => {
	const [ filterIsOpen, setFilterOpen ] = useState<boolean | string>(false);
	const [ openMenu, setOpenMenu ] = useState(false);

	const t = useAppTranslation();
	const { bookmarksItems } = useAppSelector(state => state.bookmarksReducer);
	const { comparisonItems } = useAppSelector(state => state.comparisonReducer);
	const { cartItems } = useAppSelector(state => state.cartReducer);

	const handleClick = (value: SetStateAction<boolean | string>) => {
		if (filterIsOpen !== value) {
			setFilterOpen(value);
		} else {
			setFilterOpen(false);
		}
	};

	const closeFilter = () => {
		setFilterOpen(false);
		setOpenMenu(false);
	}

	const onClick = () => {
		setOpenMenu(false);
	}

	return <div className={twMerge('bg-zinc-800 relative', styles['header-center'])}>
		<div className={
			twMerge('container mx-auto grid items-center py-3 px-4 grid-cols-2 lg:grid-cols-[180px_auto_400px_150px]',
				styles.container)
		}>
			<Logo />
			<HeaderMenu />
			<Search />
			<div className={twMerge('flex gap-4 md:gap-7 justify-end pr-2.5', styles.menu)}>
				<Link to='/comparison' className='relative'>
					{ comparisonItems.length > 0 && <Badge value={ comparisonItems.length } /> }
					<Icons.LibraIcon className='fill-white' />
				</Link>
				<Link to='/bookmarks' className='relative'>
					{ bookmarksItems.length > 0 && <Badge value={ bookmarksItems.length } /> }
					<Icons.HeartIcon className='stroke-white' />
				</Link>
				<Link to='/cart' className='relative'>
					{ cartItems.length > 0 && <Badge value={ cartItems.length } /> }
					<Icons.CartIcon className='stroke-white' />
				</Link>
				<button onClick={() => setOpenMenu(prev => !prev)} className='lg:hidden'>
					{ openMenu ? <Icons.CloseIcon className='stroke-white' /> : <Icons.MenuIcon className='fill-white'/> }
				</button>
			</div>
		</div>
		<div className={ twMerge('absolute top-36 text-white bg-zinc-900 w-full divide-y divide-natural-600 border-t border-b border-natural-600 z-50 lg:hidden', !openMenu && 'hidden') }>
			<div className='py-5'>
				<button onClick={() => handleClick('tires')}
								className={twMerge('px-5 w-full flex items-center justify-between uppercase font-bold group transition hover:text-blue-300', filterIsOpen === 'tires' && 'text-blue-300')}>
					<span>{ t('cartires') }</span>
					<span className={twMerge('transition', filterIsOpen === 'tires' && 'rotate-180')}>
						<Icons.ChevronDownIcon
							className={twMerge('stroke-white transition group-hover:stroke-blue-300', filterIsOpen === 'tires' && 'stroke-blue-300')}/>
					</span>
				</button>
				{ filterIsOpen === 'tires' &&
					<div className='mt-5 px-5 py-5 border-t border-natural-600 bg-zinc-900 grid grid-cols-2'>
						<CarTireFilter closeFilter={ closeFilter } />
					</div>
				}
				</div>
					<div className='py-5'>
					<button
						onClick={() => handleClick('disks')}
						className={
						twMerge('px-5 w-full flex items-center justify-between uppercase font-bold group transition hover:text-blue-300',
							filterIsOpen === 'disks' && 'text-blue-300'
						)}
					>
					<span>Автодиски</span>
					<span className={twMerge('transition', filterIsOpen === 'disks' && 'rotate-180')}>
						<Icons.ChevronDownIcon
							className={twMerge('stroke-white transition group-hover:stroke-blue-300', filterIsOpen === 'disks' && 'stroke-blue-300')}/>
					</span>
				</button>
				{ filterIsOpen === 'disks' &&
					<div className='mt-5 px-5 py-5 border-t border-natural-600 bg-zinc-900 grid grid-cols-2'>
						<CarDiskFilter closeFilter={ closeFilter } />
					</div>
				}
			</div>
			{links.map((item, index) => {
				return <Link key={ index } onClick={ () => onClick() } className='py-5 px-5 block uppercase font-bold' to={ item.url }>
					{ t(item.title) }
				</Link>
			})}
		</div>
	</div>
};
