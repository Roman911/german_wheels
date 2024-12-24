import { Helmet } from 'react-helmet-async';

import { baseDataAPI } from '../../services/baseDataService';
import { useAppSelector, useAppTranslation } from '../../hooks';
import { LayoutWrapper } from '../../components/Layout';
import { ProductList } from '../ProductList';
import { NoResult, Spinner } from '../../components/Lib';
import { Language } from '../../models/language';
import { Breadcrumbs } from '../../components/Breadcrumbs';

export const Services = () => {
	const { lang } = useAppSelector(state => state.langReducer);
	const { settings } = useAppSelector(state => state.settingsReducer);
	const { data, isLoading } = baseDataAPI.useFetchProductsQuery({ id: '?typeproduct=5&categories=8' });
	const t = useAppTranslation();

	const path = [
		{
			id: 1,
			title: t('services', true),
			url: '/'
		}
	];

	return <LayoutWrapper>
		<Helmet>
			<title>{ `${settings?.[lang].meta_title} | ${settings?.[lang].config_name}` }</title>
			<meta name='description' content={ `${settings?.[lang].meta_description} | ${settings?.[lang].config_name}` } />
		</Helmet>
		<Breadcrumbs path={ path } />
		<Spinner height='h-60' show={isLoading} size='large'>
			{data?.result ? <ProductList
				classnames='grid-cols-1 sm:grid-cols-2 md:grid-cols-4'
				data={data?.data}
			/> : <NoResult
				noResultText={ lang === Language.UA ?
					'На жаль, по заданих параметрах товарів не знайдено' :
					'К сожалению, по заданным параметрам товаров не найдено'
				}
			/>}
		</Spinner>
	</LayoutWrapper>
};
