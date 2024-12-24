import { FC } from 'react';

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
	telephones: {
		phone: string
		url: string
		logo: 'vodafone' | 'kievstar' | 'lifecell'
	}[]
}

export const ContactsComponent: FC<ContactsProps> = ({ telephones }) => {
	return <div className='py-1 text-white flex items-center'>
		{telephones.map((item, index) => {
			return <div key={index} className='flex items-center my-0.5 text-sm font-semibold mr-5'>
				<img src={phoneLogos[item.logo]} alt={item.logo + '-logo'}/>
				<a href={`tel:${item.url}`} className='ml-2.5'>
					{item.phone}
				</a>
			</div>
		})}
	</div>
};
