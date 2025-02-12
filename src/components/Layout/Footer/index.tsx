import { config } from '../../../config';

import { Link } from '../../../lib';
import { baseDataAPI } from '../../../services/baseDataService';
import { useAppSelector, useAppTranslation } from '../../../hooks';
import { linksCatalog } from './linksCatalog';
import { PhoneLogo } from '../../../models/config';
import * as Icons from '../../Lib/Icons';
import { AliasItem } from '../../../models/alias';

import kievstarLogo from '../../../assets/kievstar-logo.png';
import lifecellLogo from '../../../assets/life-logo.png';
import vodafoneLogo from '../../../assets/vodafone-logo.png';
import { Logo } from '../../Lib';

type IconType = 'telegram' | 'facebook' | 'viber';

const phoneLogos: Record<PhoneLogo, string> = {
	vodafone: vodafoneLogo,
	kievstar: kievstarLogo,
	lifecell: lifecellLogo,
};

export const Footer = () => {
	const { lang } = useAppSelector(state => state.langReducer);
	const { settings } = useAppSelector(state => state.settingsReducer);
	const { data } = baseDataAPI.useFetchStatiAliasAllQuery('');
	const t = useAppTranslation();

	const icons: Record<IconType, JSX.Element> = {
		telegram: <Icons.TelegramIcon className='fill-black group-hover:fill-white' />,
		facebook: <Icons.FacebookIcon className='fill-black group-hover:fill-white' />,
		viber: <Icons.ViberIcon className='fill-black group-hover:fill-white' />,
	};

	const link = (link: string, title: string, index: number) => {
		return <Link
			key={ index }
			className='text-white block text-sm font-medium mt-4 transition hover:text-blue-300 hover:underline'
			to={ link }
		>
			{ t(title, true) }
		</Link>
	}

	const telephones: { phone: string; url: string; logo: "vodafone" | "kievstar" | "lifecell"; }[] = [
		{ phone: settings[lang].config_telephone_kievstar, url: settings[lang].config_telephone_kievstar_url, logo: 'kievstar' },
		{ phone: settings[lang].config_telephone_life, url: settings[lang].config_telephone_life_url, logo: 'lifecell' },
	];

	return <footer className='bg-black'>
		<div className='container mx-auto py-16 px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
			<div>
				<h6 className='text-gray-500 text-sm font-bold'>
					{t('contacts', true)}
				</h6>
				{telephones.map((item, index) => {
					return <div key={index} className='flex items-center mt-5'>
						<img src={phoneLogos[item.logo]} alt={item.logo + '-logo'}/>
						<a href={`tel:${item.url}`} className='ml-2.5 text-sm text-white'>
							{item.phone}
						</a>
					</div>
				})}
				<div className='flex items-center mt-5'>
					<Icons.EmailIcon className='fill-white'/>
					<a href={`mailto:${settings[lang].config_email}`} className='ml-2.5 text-sm text-white'>
						{settings[lang].config_email}
					</a>
				</div>
				{settings[lang].config_address && <>
					<h6 className='mt-8 text-gray-500 text-sm font-bold'>
						{t('delivery points', true)}
					</h6>
					<p className='text-white block text-sm font-medium mt-2 whitespace-pre-wrap leading-8'>
						{settings[lang].config_address}
					</p>
				</>}
			</div>
			<div>
				<h6 className='text-gray-500 text-sm font-bold mb-7'>
					Каталог
				</h6>
				{linksCatalog.map((item, index) => {
					return link(item.link, item.title, index)
				})}
			</div>
			<div>
				<h6 className='text-gray-500 text-sm font-bold mb-7'>
					{t('information', true)}
				</h6>
				{data?.footer.map((item: AliasItem, index: number) => {
					return link(`/page/${item.slug}`, item.descriptions[lang].title, index)
				})}
			</div>
			<div>
				<div className='flex gap-x-5'>
					{config.social.links.map((item, index) => {
						return <a
							key={index}
							target='_blank'
							href={item.link}
							className='w-9 h-9 rounded-full cursor-pointer bg-white flex items-center justify-center transition group hover:bg-blue-500'
						>
							{icons[item.logo as IconType]}
						</a>
					})}
				</div>
				<p className='text-gray-500 mt-7 mb-7 leading-6 text-sm'>
					© {settings[lang].config_name} {new Date().getFullYear()}.<br/>
					{lang === 'ua' ? 'Всі права захищені.' : 'Все права защищены.'}
				</p>
				<Logo isFooter={ true } />
			</div>
		</div>
	</footer>
};
