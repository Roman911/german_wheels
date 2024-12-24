import { useState, SetStateAction } from 'react';
import { twMerge } from 'tailwind-merge';
import styles from './index.module.scss';

import { useAppSelector, useAppTranslation } from '../../../../hooks';
import { Link } from '../../../../lib';
import { Search } from '../../../../containers/Layout/Header/Search';
import { Badge } from '../../../Lib';

import logo from '../../../../assets/logo.svg';
import { CartIcon, ChevronDownIcon, CloseMenuIcon, HeartIcon, LibraIcon, MenuIcon } from '../../../Lib/Icons';
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
		<div
			className={twMerge('container mx-auto grid items-center py-3 px-4 grid-cols-2 lg:grid-cols-[200px_auto_400px_150px]', styles.container)}>
			<Link to='/' className='logo w-40 lg:w-auto'>
				<img src={logo} className="logo" alt="logo"/>
			</Link>
			<HeaderMenu />
			<Search />
			<div className={twMerge('flex gap-4 md:gap-7 justify-end', styles.menu)}>
				<Link to='/comparison' className='relative'>
					{ comparisonItems.length > 0 && <Badge value={ comparisonItems.length } /> }
					<LibraIcon className='fill-white' />
				</Link>
				<Link to='/bookmarks' className='relative'>
					{ bookmarksItems.length > 0 && <Badge value={ bookmarksItems.length } /> }
					<HeartIcon className='stroke-white' />
				</Link>
				<Link to='/cart' className='relative'>
					{ cartItems.length > 0 && <Badge value={ cartItems.length } /> }
					<CartIcon className='stroke-white' />
				</Link>
				<button onClick={() => setOpenMenu(prev => !prev)} className='lg:hidden'>
					{ openMenu ? <CloseMenuIcon className='fill-white' /> : <MenuIcon className='fill-white'/> }
				</button>
			</div>
		</div>
		<div className={ twMerge('absolute top-28 bg-white w-full divide-y divide-[#E6E9EB] border-t border-b border-[#E6E9EB] z-50 lg:hidden', !openMenu && 'hidden') }>
			<div className='py-5'>
				<button onClick={() => handleClick('tires')}
								className={twMerge('px-5 w-full flex items-center justify-between uppercase font-bold group transition hover:text-blue-500', filterIsOpen === 'tires' && 'text-blue-500')}>
					<span>{ t('cartires') }</span>
					<span className={twMerge('transition', filterIsOpen === 'tires' && 'rotate-180')}>
						<ChevronDownIcon
							className={twMerge('stroke-black transition group-hover:stroke-blue-500', filterIsOpen === 'tires' && 'stroke-blue-500')}/>
					</span>
				</button>
				{ filterIsOpen === 'tires' &&
					<div className='mt-5 px-5 py-5 border-t border-[#E6E9EB] bg-[#FAFAFC] grid grid-cols-2'>
						<CarTireFilter closeFilter={ closeFilter } />
					</div>
				}
				</div>
					<div className='py-5'>
					<button
						onClick={() => handleClick('disks')}
						className={
						twMerge('px-5 w-full flex items-center justify-between uppercase font-bold group transition hover:text-blue-500',
							filterIsOpen === 'disks' && 'text-blue-500'
						)}
					>
					<span>Автодиски</span>
					<span className={twMerge('transition', filterIsOpen === 'disks' && 'rotate-180')}>
						<ChevronDownIcon
							className={twMerge('stroke-black transition group-hover:stroke-blue-500', filterIsOpen === 'disks' && 'stroke-blue-500')}/>
					</span>
				</button>
				{ filterIsOpen === 'disks' &&
					<div className='mt-5 px-5 py-5 border-t border-[#E6E9EB] bg-[#FAFAFC] grid grid-cols-2'>
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
