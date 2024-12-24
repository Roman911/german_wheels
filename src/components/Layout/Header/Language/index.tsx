import { FC } from 'react';
import { Link } from 'react-router-dom';
import classNames from "classnames";

import { Language } from '../../../../models/language';

interface LanguageProps {
	lang: Language
	path: string
	onChangeLang: (lang: Language) => void
}

const params = [
	{ title: 'UA', language: Language.UA },
	{ title: 'RU', language: Language.RU },
];

export const LanguageComponent: FC<LanguageProps> = ({ lang, path, onChangeLang }) => {
	const newPath = path.replace(/^\/ru/, '');

	return <div className='divide-x text-gray-500 divide-gray-500'>
		{ params.map((item, index) => {
			return <Link
				key={ index }
				to={ item.language === Language.UA ? newPath : `/ru${path}` }
				onClick={ () => onChangeLang(item.language) }
				className={
				classNames('font-bold text-sm 2xl:text-base leading-8 pr-1.5 2xl:pr-3 active:text-white',
					{'text-white pointer-events-none': lang === item.language, 'pr-1.5 2xl:pr-3': item.language === Language.UA, 'pl-1.5 2xl:px-3': item.language === Language.RU })
			}>
				{ item.title }
			</Link>
		}) }
	</div>
};
