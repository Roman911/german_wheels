import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { useAppSelector, useAppTranslation } from '../../hooks';
import { Categories, List } from '../../components/CatalogMap';
import { LayoutWrapper } from '../../components/Layout';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { NoResult, Spinner } from '../../components/Lib';

import { Language } from '../../models/language';
import { baseDataAPI } from '../../services/baseDataService.ts';

export const CatalogMap = () => {
	const { lang } = useAppSelector(state => state.langReducer);
	const { settings } = useAppSelector(state => state.settingsReducer);
	const t = useAppTranslation();
	const location = useLocation();
	const pathname = location.pathname.split('/');
	const indexOf = pathname.indexOf('catalog-map');
	const slug = pathname[indexOf + 1] && pathname[indexOf + 1].length > 0;
	const { data, isLoading } = baseDataAPI.useFetchBrandsQuery( {type: pathname[indexOf + 1], id: ''});

	console.log(data)

	const path = [
		{
			id: 1,
			title: t('brands', true),
			url: '/'
		}
	];

	return <LayoutWrapper>
		<Helmet>
			<title>{ `${settings?.[lang].meta_title} | ${settings?.[lang].config_name}` }</title>
			<meta name='description' content={ `${settings?.[lang].meta_description} | ${settings?.[lang].config_name}` } />
		</Helmet>
		<Breadcrumbs path={ path } />
		{ slug ? <Spinner height='h-60' show={ isLoading } size='large'>
			{data ? <List data={ data } /> : <NoResult
				noResultText={ lang === Language.UA ?
					'На жаль, по заданих параметрах товарів не знайдено' :
					'К сожалению, по заданным параметрам товаров не найдено'
				}
			/>}
		</Spinner> : <Categories /> }
	</LayoutWrapper>
};
