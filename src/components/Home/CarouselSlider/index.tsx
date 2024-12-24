import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import './index.scss';
import { Link } from '../../../lib';
import { useAppSelector } from '../../../hooks';
import type { Banner } from '../../../models/banners';

interface CarouselProps {
	data: Banner[] | undefined
}

export const CarouselSlider: FC<CarouselProps> = ({ data }) => {
	const [ width, setWidth ] = useState('desktop');
	const { lang } = useAppSelector(state => state.langReducer);

	useEffect(() => {
		if(window.innerWidth < 768) {
			setWidth('gadget');
		}
	}, []);

	return <div className="mt-16">
		<Carousel
			showArrows={ width === 'gadget' }
			autoPlay={ true }
			infiniteLoop={ true }
			interval={ 5000 }
			showThumbs={ false }
			showStatus={ false }
			showIndicators={ width === 'desktop' }
		>
			{data?.map(item => {
				return <div key={ item.banner_id } className='relative h-[440px] md:h-auto'>
					<img src={ item.image } alt='' className='object-cover h-full'/>
					{ item.descriptions[lang].button_title &&
						<Link
							to={ item.descriptions[lang].button_link }
							className={classNames('btn secondary absolute bottom-6 md:m-0 md:bottom-16 w-10/12 md:w-72 left-2/4 -translate-x-1/2 md:translate-x-0',
								{ 'md:left-auto md:right-24': item.banner_id === 2, 'md:left-24': item.banner_id !== 2 }
							)}
						>
						{ item.descriptions[lang].button_title }
					</Link> }
				</div>
			})}
		</Carousel>
	</div>
};
