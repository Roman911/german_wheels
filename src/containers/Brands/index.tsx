import { Helmet } from 'react-helmet-async';
import { Breadcrumbs } from '../../components/Breadcrumbs';
import { Categories } from '../../components/CatalogMap';
import { LayoutWrapper } from '../../components/Layout';
import { useAppTranslation } from '../../hooks';

export const Brands = () => {
	const t = useAppTranslation();

	const path = [
		{
			id: 1,
			title: t('brands', true),
			url: '/'
		}
	];

	return <LayoutWrapper>
		<Helmet>
			<title>Каталоги</title>
			<meta name='description' content='Каталоги' />
		</Helmet>
		<Breadcrumbs path={ path } />
		<Categories />
	</LayoutWrapper>
};
