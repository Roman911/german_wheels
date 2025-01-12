import { FC, MouseEvent, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';

import style from './index.module.scss';
import { addToStorage, getFromStorage, Link } from '../../lib';
import { useAppDispatch, useAppSelector, useAppTranslation } from '../../hooks';
import { addCart } from '../../store/reducers/cartSlice';
import * as Icons from '../Lib/Icons';
import { Language } from '../../models/language';
import { Rating } from '../Lib';
import type { Product } from '../../models/products';
import { Section } from '../../models/filter';
import { onAddToCart } from '../../event';

import noPhoto from '../../assets/no-photo.jpg';
import noPhotoRu from '../../assets/no-photo-ru.jpg';

const icons = {
	1: Icons.CarIcon,
	2: Icons.SuvIcon,
	7: Icons.MotorcyclesIcon,
	8: Icons.BusIcon,
	9: Icons.CargoIcon,
};
const cargo = [ '3', '4', '5', '6', '9', '10', '11' ];

interface ProductCardProps {
	item: Product
	isBookmarks: boolean
	isComparison: boolean
	addToDefense: (event: MouseEvent<HTMLButtonElement>, id: number) => void
	addToComparison: (event: MouseEvent<HTMLButtonElement>, id: number) => void
}

export const ProductCardComponent: FC<ProductCardProps> = ({
																														 item,
																														 isBookmarks,
																														 isComparison,
																														 addToDefense,
																														 addToComparison
																													 }) => {
	const navigate = useNavigate();
	const location = useLocation();
	const t = useAppTranslation();
	const dispatch = useAppDispatch();
	const { best_offer, default_photo, full_name, group, min_price, season, vehicle_type, page_url } = item;
	const { lang } = useAppSelector(state => state.langReducer);
	const cartStorage = useMemo(() => getFromStorage('reducerCart'), []);
	const section = item.vehicle_type ? Section.Tires : item.diameter ? Section.Disks : Section.Battery;
	const sectionNew = section === Section.Tires ? cargo.includes(item.vehicle_type) ? 'cargo' : 'tires' : section;

	const seasonIcon = season === '1' ? 'sun' : season === '2' ? 'snow' : season === '3' ? 'all-season' : undefined;
	const vehicle_type_number = vehicle_type as unknown as keyof typeof icons;
	const Icon = icons[vehicle_type_number] || null;
	const dopServices = location.pathname === '/auto-goods' || location.pathname === '/services';
	const dopServicesSection = location.pathname === '/auto-goods' ? Section.AutoGoods : Section.Services;
	const url = dopServices ? `#` : `/${ page_url }`;

	const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
		onAddToCart(item, t(section, true), 1);
		if(!cartStorage?.find((item: { id: number, quantity: number }) => item.id === best_offer.id)) {
			const cart = [ ...cartStorage, {
				id: best_offer.id,
				section: dopServices ? dopServicesSection : sectionNew,
				quantity: 1
			} ];
			dispatch(addCart({ id: best_offer.id, quantity: 1, section: dopServicesSection }));
			addToStorage('reducerCart', cart);
		}
		navigate(lang === Language.UA ? '/cart' : '/ru/cart');
	};

	return (
		<Link to={ url } className={ classNames(style['product-card'], 'group') }>
			<div className='relative min-h-72 sm:min-h-52'>
				<div className='absolute'>
					{ seasonIcon && <img src={ `/images/${ seasonIcon }-icon.svg` } alt=""/> }
					{ Icon && <Icon className={ classNames('fill-[#575C66]', { 'stroke-[#575C66]': vehicle_type === '2' }) }/> }
				</div>
				<div
					className={ classNames('absolute right-0 group-hover:visible flex flex-col', { 'hidden': dopServices }) }>
					<button onClick={ event => addToDefense(event, group) }>
						<Icons.HeartIcon
							className={ classNames('stroke-[#8D8E90] hover:stroke-blue-300', { 'stroke-blue-300 fill-blue-300': isBookmarks }) }/>
					</button>
					<button onClick={ event => addToComparison(event, group) }>
						<Icons.LibraIcon
							className={ classNames('mt-5 fill-[#8D8E90] hover:fill-blue-300', { 'fill-blue-300': isComparison }) }/>
					</button>
				</div>
				<img src={ default_photo || (lang === Language.UA ? noPhoto : noPhotoRu) } alt={ full_name }/>
			</div>
			<p className='font-bold my-2.5 min-h-12 text-center'>{ full_name }</p>
			<div className='text-sm text-gray-500 my-2.5 text-center'>
				<span>Артикул: </span><span>{ group }</span>
			</div>
			<Rating commentsCount={ undefined } commentsAvgRate={ 0 }/>
			<div className='flex items-end justify-center mt-2.5 mb-4'>
				<div className='text-sm font-medium mb-0.5 mr-1'>{ t('from') }</div>
				<div className='text-2xl font-bold'>{ min_price } ₴</div>
			</div>
			<button onClick={ (event) => handleClick(event) } className='btn primary w-full uppercase'>
				{ t('buy') }
			</button>
		</Link>
	)
};
