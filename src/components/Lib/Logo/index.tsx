import { FC } from 'react';

import { Link } from '../../../lib';

import logo from '../../../assets/logo.svg';
import footerLogo from '../../../assets/footer-logo.svg';

interface LogoProps {
	isFooter?: boolean;
}

export const Logo: FC<LogoProps> = ({ isFooter }) => {
	return <Link to='/' className='logo w-40 lg:w-auto'>
		<img src={ isFooter ? footerLogo : logo } className="logo" alt="logo"/>
	</Link>
};
