import { baseDataAPI } from '../../../services/baseDataService';
import { Spinner } from '../../../components/Lib';
import { CarouselSlider } from '../../../components/Home';

export const Carousel = () => {
	const { data, isLoading } = baseDataAPI.useFetchBannersQuery('');

	return <Spinner height='h-60' show={ isLoading }>
		<CarouselSlider data={ data } />
	</Spinner>
};
