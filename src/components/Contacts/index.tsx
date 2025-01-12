import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

import vodafoneLogo from '../../assets/vodafone-logo.png';
import kievstarLogo from '../../assets/kievstar-logo.png';
import lifecellLogo from '../../assets/life-logo.png';

import { PhoneLogo } from '../../models/config';

const phoneLogos: Record<PhoneLogo, string> = {
	vodafone: vodafoneLogo,
	kievstar: kievstarLogo,
	lifecell: lifecellLogo,
};

interface ContactsProps {
	isInfo?: boolean
	telephones: {
		phone: string
		url: string
		logo: 'vodafone' | 'kievstar' | 'lifecell'
	}[]
}

export const ContactsComponent: FC<ContactsProps> = ({ isInfo, telephones }) => {
	return <div className={ twMerge('py-1 text-white flex items-center', isInfo && 'text-black flex-col') }>
		{telephones.map((item, index) => {
			return <div key={index} className={ twMerge('flex items-center my-0.5 text-sm font-semibold', !isInfo && 'mr-1.5 md:mr-5') } >
				<img src={phoneLogos[item.logo]} alt={item.logo + '-logo'}/>
				<a href={`tel:${item.url}`} className='ml-1 md:ml-2.5'>
					{item.phone}
				</a>
			</div>
		})}
	</div>
};
