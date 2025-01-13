import { Link } from '../../../lib';
import { useAppSelector, useAppTranslation } from '../../../hooks';
import { Contacts } from '../../../containers/Contacts';

import * as Icons from '../../Lib/Icons';

export const InfoBlock = () => {
	const { lang } = useAppSelector(state => state.langReducer);
	const { settings } = useAppSelector(state => state.settingsReducer);
	const t = useAppTranslation();

	return <div className='lg:w-80'>
		<div className=' bg-white rounded px-5 py-7'>
			<Contacts isInfo={ true } />
			<div className='flex items-center gap-x-2.5 mt-2'>
				<Icons.EmailIcon className='fill-black' />
				<a href={`mailto:${settings.ua.config_email}`} className='ml-1 font-bold'>
					{settings.ua.config_email}
				</a>
			</div>
			<div className='mt-5 text-sm pb-4 border-b border-[#D8D8D9] leading-9 whitespace-pre-wrap'>
				{ settings[lang].config_address }
			</div>
			<Link to='/page/shipment' className='mt-4 flex items-center gap-x-2.5 font-medium text-black hover:text-blue-300 hover:underline'>
				<Icons.DeliveryIcon className='fill-[#868D9A]' />
				<span className='group-hover:underline'>Доставка</span>
			</Link>
			<Link to='/page/payment' className='mt-4 flex items-center gap-x-2.5 font-medium text-black hover:text-blue-300 hover:underline'>
				<Icons.PaymentIcon className='fill-[#868D9A]' />
				<span className='group-hover:underline'>Оплата</span>
			</Link>
			<Link to='/page/garantiya-ta-povernennya' className='mt-4 flex items-center gap-x-2.5 font-medium text-black hover:text-blue-300 hover:underline'>
				<Icons.GuaranteeIcon className='fill-[#868D9A]' />
				<span className='group-hover:underline'>{t('warranty and returns', true)}</span>
			</Link>
		</div>
	</div>
}
