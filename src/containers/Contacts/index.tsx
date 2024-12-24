import { useRef, useState } from 'react';

import { useClickOutside, useAppSelector } from '../../hooks';
import { ContactsComponent } from '../../components/Contacts';

export const Contacts = () => {
	const [ showOptions, setShowOptions ] = useState<boolean>(false);
	const { lang } = useAppSelector(state => state.langReducer);
	const { settings } = useAppSelector(state => state.settingsReducer);
	const tooltipRef = useRef<HTMLDivElement>(null);

	const closeOptions = () => {
		setShowOptions(false);
	}

	useClickOutside({ref: tooltipRef, open: showOptions, onClose: closeOptions});

	const telephones: { phone: string; url: string; logo: "vodafone" | "kievstar" | "lifecell"; }[] = [
		{ phone: settings[lang].config_telephone_vodafone, url: settings[lang].config_telephone_vodafone_url, logo: 'vodafone' },
		{ phone: settings[lang].config_telephone_kievstar, url: settings[lang].config_telephone_kievstar_url, logo: 'kievstar' },
		{ phone: settings[lang].config_telephone_life, url: settings[lang].config_telephone_life_url, logo: 'lifecell' },
	];

	return <ContactsComponent
		telephones={ telephones }
	/>
};
