import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { baseDataAPI } from '../../../services/baseDataService';
import { useAppSelector, useAppTranslation } from '../../../hooks';
import { FilterComponent } from '../../../components/Home';
import { Section } from '../../../models/filter';
import { Language } from '../../../models/language';
import { generateUrl } from '../../Catalog/seo';
import { IFilter } from '../../Catalog/seoType';

export const Filter = () => {
	const [filter, setFilter] = useState<IFilter>({});
	const [params, setParams] = useState('');
	const navigate = useNavigate();
	const { section } = useAppSelector(state => state.filterReducer);
	const { data } = baseDataAPI.useFetchBaseDataQuery('');
	const { data: fildterData } = baseDataAPI.useFildterDataQuery(`?typeproduct=${section === Section.Tires ? 1 : 3}&${params}`);
	const { lang } = useAppSelector(state => state.langReducer);
	const t = useAppTranslation();

	useEffect(() => {
		setFilter({});
	}, [section]);

	useEffect(() => {
		const params = [];
		if (filter.width) params.push(`width=${filter.width}`);
		if (filter.height) params.push(`height=${filter.height}`);
		if (filter.radius) params.push(`radius=${filter.radius}`);
		if (filter.krepeg) params.push(`krip=${filter.krepeg}`);
		setParams(params.join('&'));
	}, [filter]);

	const getFilters = () => {
		const filterConfigs = [];

		if(section === Section.Tires) {
			filterConfigs.push({
				label: t('width', true),
				name: 'width',
				focusValue: '175',
				options: fildterData?.tyre_width?.map(item => ({ value: item.value, label: item.value, p: item.p }))
			});

			filterConfigs.push({
				label: t('height', true),
				name: 'height',
				focusValue: '45',
				options: fildterData?.tyre_height?.map(item => ({ value: item.value, label: item.value, p: item.p }))
			});

			filterConfigs.push({
				label: t('diameter', true),
				name: 'radius',
				focusValue: `R${14}`,
				options: fildterData?.tyre_diameter?.map(item => ({ value: item.value, label: `R${item.value}`, p: item.p }))
			});

			filterConfigs.push({
				label: t('brand', true),
				name: 'brand',
				options: data?.brand?.map(item => ({ value: item.value, label: item.label }))
			});

			filterConfigs.push({
				label: t('country', true),
				name: 'country',
				options: data?.[lang === Language.UA ? 'country' : 'country_ru']?.map(item => ({ value: item.value, label: item.label }))
			});

			filterConfigs.push({
				label: t('year', true),
				name: 'year',
				options: data?.tyre_year?.map(item => ({ value: item.value, label: item.label }))
			});
		} else if(section === Section.Disks) {
			filterConfigs.push({
				label: t('brand', true),
				name: 'brand',
				options: data?.brand_disc?.map(item => ({ value: item.value, label: item.label }))
			});

			filterConfigs.push({
				label: t('diameter', true),
				name: 'radius',
				focusValue: `R${14}`,
				options: fildterData?.disc_diameter?.map(item => ({ value: item.value, label: `R${item.value}`, p: item.p }))
			});

			filterConfigs.push({
				label: t('fasteners', true),
				name: 'krip',
				options: fildterData?.krip?.map(item => ({ value: item.value, label: item.value, p: item.p }))
			});

			filterConfigs.push({
				label: 'ET ' + t('from'), name: 'et_from',
				options: data?.et?.map(item => ({ value: item.value, label: item.value, p: item.p }))
			});

			filterConfigs.push({
				label: 'ET ' + t('to'), name: 'et_to',
				options: data?.et?.map(item => ({ value: item.value, label: item.value, p: item.p }))
			});
		}

		return filterConfigs.map(config => ({
			...config,
			wide: true
		}));
	};

	const onChange = (name: string, value: number | string | undefined) => {
		if(value) {
			setFilter(prev => ({ ...prev, [name]: value}));
		}
	}

	const submit = () => {
		const searchUrl = generateUrl(filter);
		const rout = `/catalog/${section}/`;
		const newRout = lang === Language.UA ? rout : `/ru${rout}`;
		navigate(newRout + searchUrl);
	}

	return <FilterComponent
		data={ getFilters() }
		section={ section }
		onChange={ onChange }
		onSubmit={ submit }
	/>
};
