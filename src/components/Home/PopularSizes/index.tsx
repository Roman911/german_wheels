import { FC, useEffect, useState } from 'react';

import { PopularItem } from '../../Lib';
import { ProductTiporazmerProps } from '../../../models/featureParams';

interface PopularSizesProps {
	data: ProductTiporazmerProps[] | undefined
}

type SortedTires = {
	[key: number]: ProductTiporazmerProps[];
};

export const PopularSizes: FC<PopularSizesProps> = ({ data }) => {
	const [ sortParams, setSortParams ] = useState({});

	useEffect(() => {
		const sort: SortedTires = { 12: [], 13: [], 14: [], 15: [], 16: [], 17: [], 18: [], 19: [], 20: [], 21: [] };

		data?.forEach(item => {
			const radiusNumber = Number(item.radius);

			if (radiusNumber in sort) {
				sort[radiusNumber].push(item);
			}
		});

		Object.keys(sort).forEach(key => {
			if (sort[Number(key)].length === 0) {
				delete sort[Number(key)];
			}
		});

		setSortParams(sort);
	}, [data]);

	return <>
		<div className='grid grid-cols-2 lg:grid-cols-9 mt-12 gap-x-5'>
			{Object.entries(sortParams as Record<string, ProductTiporazmerProps[]>).map(([key, value]) => {
				return (
					<div key={key}>
						<div className='text-center text-lg font-bold mb-4'>R{key}</div>
						{value.map((item) => (
							<PopularItem
								key={item.tiporazmer_id}
								label={`${item.width}/${item.height} R${key}`}
								link={`/w-${item.width}/h-${item.height}/r-${item.radius}`}
							/>
						))}
					</div>
				);
			})}
		</div>
	</>
};
