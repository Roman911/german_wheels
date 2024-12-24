import { FC, useCallback, useRef } from 'react';
import Select, { GroupBase, SelectInstance, SingleValue, StylesConfig } from 'react-select';

import { useAppSelector } from '../../../../hooks';
import { Language } from '../../../../models/language';
import type { Options } from '../../../../models/baseData';

interface SelectProps {
	name: string
	label: string
	isDisabled?: boolean
	focusValue?: string
	options: Options[] | undefined
	onChange: (name: string, value: number | string | undefined) => void
}

type IsMulti = false;

const colourStyles: StylesConfig<Options | undefined, IsMulti> = {
	control: (styles) => ({
		...styles,
		padding: '11px 4px 11px 16px',
		borderColor: 'transparent',
		backgroundColor: 'rgba(255, 255, 255, 0.16)',
		':hover': {
			borderColor: '#8CC9FF',
			boxShadow: '0 0 0 1px #8CC9FF',
		},

	}),
	input: (styles) => ({
		...styles,
		fontSize: 18,
		fontWeight: 500,
		color: '#FFFFFF',
	}),
	singleValue: (styles) => ({
		...styles,
		fontSize: 18,
		fontWeight: 500,
		color: '#FFFFFF',
	}),
	placeholder: (styles, { isDisabled}) => ({
		...styles,
		fontSize: 18,
		fontWeight: 500,
		color: isDisabled ? '#ffffff82' : '#FFFFFF',
	}),
	indicatorSeparator: (styles) => ({
		...styles,
		display: 'none'
	}),
	dropdownIndicator: (styles, { isDisabled}) => ({
		...styles,
		color: isDisabled ? '#ffffff82' : '#FFFFFF',
		':hover': {
			color: '#FFFFFF',
		},
	}),
	clearIndicator: (styles) => ({
		...styles,
		color: '#FFFFFF',
		':hover': {
			color: '#FFFFFF',
		},
	}),
	menuList: (provided) => {
		return {
			...provided,
			'::-webkit-scrollbar': {
				width: '10px',
				borderRadius: '6px',
				backgroundColor: '#E4E4E5',
			},
			'::-webkit-scrollbar-thumb': {
				backgroundColor: '#ABAFB2',
				border: '2px solid #E4E4E5',
				borderRadius: '6px',
			}
		};
	},
};

export const MySelect: FC<SelectProps> = ({ name, label, options = [], focusValue, isDisabled = false, onChange }) => {
	const { lang } = useAppSelector(state => state.langReducer);
	const ref = useRef<SelectInstance<Options, IsMulti, GroupBase<Options>> | null>(null);

	const onMenuOpen = useCallback( () => {
		if (focusValue) {
			setTimeout(() => {
				const selectedEl = ref.current?.menuListRef;
				const cont = selectedEl?.querySelectorAll('.MyDropdown__option') || [];

				// Find the index of the element with the matching textContent
				const elIndex = Array.from(cont).findIndex(el => el.textContent === focusValue);

				if (elIndex !== -1) {
					// Scroll to the found option
					selectedEl?.scroll(0, elIndex * 40);
				}
			}, 15);  // Adjusted delay
		}
	}, [focusValue]);

	const handleChange = (value: SingleValue<Options | undefined>) => {
		onChange(name, value?.value);
	}

	return <Select
		options={ options }
		ref={ ref as never }
		onMenuOpen={ onMenuOpen }
		styles={ colourStyles }
		placeholder={ label }
		isClearable={ true }
		isDisabled={ isDisabled }
		onChange={ handleChange }
		className='MyDropdown'
		classNamePrefix='MyDropdown'
		noOptionsMessage={ () => lang === Language.UA ? 'Збігів не знайдено' : 'Совпадений не найдено' }
	/>
};
