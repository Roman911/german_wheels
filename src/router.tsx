import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ROUTES } from "./etc/const";
import { Layout } from './containers/Layout';

import { Home } from './containers/Home';
import { Catalog } from './containers/Catalog';
import { Product } from './containers/Product';
import { Bookmarks } from './containers/Bookmarks';
import { Comparison } from './containers/Comparison';
import { Cart } from './containers/Cart';
import { Order } from './containers/Order';
import { SuccessfulOrder } from './containers/SuccessfulOrder';
import { Search } from './containers/Search';
import { CalculatorForTires } from './containers/CalculatorForTiresPage';
import { AutoGoods } from './containers/AutoGoods';
import { Services } from './containers/Services';
import { Alias } from './containers/Alias';
import { ErrorPage } from './containers/Error/404';

const router = createBrowserRouter([
	{
		path: ROUTES.home,
		element: <Layout />,
		errorElement: <Layout >
			<ErrorPage />
		</Layout>,
		children: [
			{
				index: true,
				element: <Home />,
			},
			{
				path: ROUTES.catalog,
				element: <Catalog />
			},
			{
				path: ROUTES.product,
				element: <Product />
			},
			{
				path: ROUTES.bookmarks,
				element: <Bookmarks />
			},
			{
				path: ROUTES.comparison,
				element: <Comparison />
			},
			{
				path: ROUTES.cart,
				element: <Cart />
			},
			{
				path: ROUTES.order,
				element: <Order />
			},
			{
				path: ROUTES.successful,
				element: <SuccessfulOrder />
			},
			{
				path: ROUTES.search,
				element: <Search />
			},
			{
				path: ROUTES.tyreDiskSizeCalc,
				element: <CalculatorForTires />
			},
			{
				path: ROUTES.autoGoods,
				element: <AutoGoods />
			},
			{
				path: ROUTES.services,
				element: <Services />
			},
			{
				path: ROUTES.page,
				element: <Alias />
			},
		]
	},
]);

export const App = () => <RouterProvider router={ router } />
