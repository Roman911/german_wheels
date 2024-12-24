import { FC } from 'react';
import { twMerge } from 'tailwind-merge';

import { Link } from '../../../../../../lib';
import type { LinkComponentProps } from '../../../../../../models/linkComponent';

export const LinkComponent: FC<LinkComponentProps> = ({to, onClick, img, label, mt, border }) => {
	return <Link
		to={ to }
		onClick={ onClick }
		className={ twMerge('flex items-center gap-2.5 group', mt,
			border && 'w-12 lg:w-14 h-10 text-sm lg:text-base justify-center font-medium border border-natural-800 rounded-sm transition bg-natural-800 hover:text-blue-200 hover:border-blue-200'
		)}
	>
		{ img && <img src={ `/images/${img}.svg` } alt=""/> }
		<span className={ twMerge(!border && 'transition group-hover:text-blue-200 group-hover:underline') }>
			{ label }
		</span>
	</Link>
};
