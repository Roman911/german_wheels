import { baseDataAPI } from '../../../services/baseDataService';
import { useAppSelector } from '../../../hooks';
import { Spinner, Title } from '../../../components/Lib';
import { PopularSizes, PopularBrands } from '../../../components/Home';
import { Language } from '../../../models/language';

export const PopularBlock = () => {
	const { lang } = useAppSelector(state => state.langReducer);
	const { data, isLoading } = baseDataAPI.useFetchFeatureParamsQuery('');

	return <>
		<div className='mt-28'>
			<Title title={ lang === Language.UA ? 'Популярні розміри легкових шин' : 'Популярные размеры легковых шин' }/>
			<Spinner height='h-40' show={ isLoading }>
				<PopularSizes data={ data?.ProductTiporazmer } />
			</Spinner>
		</div>
		<div className='mt-24'>
			<Title title={ lang === Language.UA ? 'Популярні розміри легкових шин' : 'Популярные размеры легковых шин' }/>
			<Spinner height='h-40' show={ isLoading }>
				<PopularBrands data={ data?.Car2Brand } />
			</Spinner>
		</div>
	</>
};
