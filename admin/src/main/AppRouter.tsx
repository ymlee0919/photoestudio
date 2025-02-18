import { createBrowserRouter } from "react-router-dom";

import NotFound from "./NotFound";
import Layout from "./Layout";

import Home from "../pages/Home";
import Business from "../pages/Business";
import Gallery from "../pages/Gallery";
import Offers from "../pages/Offers"
import NewOffer from "../pages/offer/NewOffer";
import EditOffer from "../pages/offer/EditOffer";
import Accounts from "../pages/Accounts";
import CopyOffer from "../pages/offer/CopyOffer";
import Services from "../pages/Services";
import Categories from "../pages/Categories";

const AppRouter = createBrowserRouter([
	{
		path: "/",
		element: <Layout />,
		errorElement: <NotFound />,
		children: [
			{
				index: true,
				element: <Home />,
				errorElement: <NotFound />,
			},
			{
				path: "/business",
				element: <Business />,
			},
			{
				path: "/accounts",
				element: <Accounts />,
			},
			{
				path: "/offers",
				element: <Offers />,
			},
			{
				path: "/categories",
				element: <Categories />,
			},
			{
				path: "/offers/new",
				element: <NewOffer />,
			},
			{
				path: "/offers/:id/edit",
				element: <EditOffer />,
			},
			{
				path: "/offers/:id/copy",
				element: <CopyOffer />,
			},
			{
				path: "/gallery",
				element: <Gallery />,
			},
			{
				path: "/services",
				element: <Services />,
			},
		],
	},
]);

export default AppRouter;