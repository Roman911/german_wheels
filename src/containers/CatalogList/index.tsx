import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

import { useAppSelector, useAppTranslation } from '../../hooks';
import { ProductList } from '../../components/CatalogMap';
import { LayoutWrapper } from '../../components/Layout';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { NoResult, Spinner } from '../../components/Lib';

import { Language } from '../../models/language';
import { baseDataAPI } from '../../services/baseDataService';

export const CatalogList = () => {
	const { lang } = useAppSelector(state => state.langReducer);
	const { settings } = useAppSelector(state => state.settingsReducer);
	const t = useAppTranslation();
	const { section, id } = useParams();
	const { data, isLoading } = baseDataAPI.useFetchBrandItemsQuery({ section, id });

	const title = `${ t('manufacturers', true) } ${ section ? t(section) : '' }`;

	const path = [
		{
			id: 1,
			title: t('brands', true),
			url: '/catalog-map'
		},
		{
			id: 2,
			title: title,
			url: `/catalog-map/${section}`
		}
	];

	return <LayoutWrapper>
		<Helmet>
			<title>{ `${settings?.[lang].meta_title} | ${settings?.[lang].config_name}` }</title>
			<meta name='description' content={ `${settings?.[lang].meta_description} | ${settings?.[lang].config_name}` } />
		</Helmet>
		<Breadcrumbs path={ path } />
		<Spinner height='h-60' show={ isLoading } size='large'>
			{data ? <ProductList data={ data } section={ section } title={ title } /> : <NoResult
				noResultText={ lang === Language.UA ?
					'На жаль, по заданих параметрах товарів не знайдено' :
					'К сожалению, по заданным параметрам товаров не найдено'
				}
			/>}
		</Spinner>
	</LayoutWrapper>
};
