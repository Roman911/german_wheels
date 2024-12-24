import { useAppTranslation } from '../../../hooks';
import { Link } from '../../../lib';

export const ShowAll = () => {
	const t = useAppTranslation();

	return <Link to='/catalog/tires' className='btn secondary md:hidden mt-10 mx-auto border border-zinc-400' >
		{ t('show all', true) }
	</Link>
}
