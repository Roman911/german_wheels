import { Language } from '../../../../containers/Layout/Header/Language';
import { Contacts } from '../../../../containers/Contacts';

export const TopLine = () => {
	return <div className='bg-black text-white border-b-natural-700 border-b border-natural-700'>
		<div className='container mx-auto flex justify-between py-2 px-4'>
			<Contacts />
			<Language />
		</div>
	</div>
};
