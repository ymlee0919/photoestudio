import { MdAttachMoney, MdAutoAwesome, MdCamera, MdOutlineCases, MdPeopleAlt } from "react-icons/md";
import Breadcrumbs from "../components/Breadcrumbs";
import { NavLink } from "react-router-dom";

import { useSelector } from 'react-redux'; 
import { RootState } from "../store/local/store"; 

const Home = () => {
    const accounts = useSelector((state: RootState) => state.global.accounts); 
    const images = useSelector((state: RootState) => state.global.images); 
    const offers = useSelector((state: RootState) => state.global.offers);
    const currency = useSelector((state: RootState) => state.global.currency);
    const services = useSelector((state: RootState) => state.global.services);
    const galleryLimit = useSelector((state: RootState) => state.global.galleryLimit);
    
    return (
		<>
			<Breadcrumbs
				pages={[
					{
						url: ".",
						label: "Dashboard",
					},
				]}
			/>
			<h1 className="text-slate-600 text-3xl text-right">Administration Dashboard</h1>
			<br></br>
			<br></br>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:sm:grid-cols-3 lg:grid-cols-4 gap-5">
				<div className="stats shadow bg-base-100">
					<div className="stat">
						<div className="stat-figure text-indigo-500">
							<MdAttachMoney className="text-6xl" />
						</div>
						<div className="stat-title text-slate-500">Currency</div>
						<div className="stat-value text-slate-600">{currency}</div>
						<div className="stat-actions text-right">
							<NavLink to={"/business"} className="btn btn-sm btn-info btn-outline">
								Edit
							</NavLink>
						</div>
					</div>
				</div>

				<div className="stats shadow bg-base-100">
					<div className="stat">
						<div className="stat-figure text-indigo-500">
							<MdAutoAwesome className="text-6xl" />
						</div>
						<div className="stat-title text-slate-500">Offers</div>
						<div className="stat-value text-slate-600">{offers}</div>
						<div className="stat-actions text-right">
							<NavLink to={"/offers"} className="btn btn-sm btn-info btn-outline">
								Edit
							</NavLink>
						</div>
					</div>
				</div>

				<div className="stats shadow bg-base-100">
					<div className="stat">
						<div className="stat-figure text-indigo-500">
							<MdOutlineCases className="text-6xl" />
						</div>
						<div className="stat-title text-slate-500">Services</div>
						<div className="stat-value text-slate-600">{services}</div>
						<div className="stat-actions text-right">
							<NavLink to={"/services"} className="btn btn-sm btn-info btn-outline">
								Edit
							</NavLink>
						</div>
					</div>
				</div>

				<div className="stats shadow bg-base-100">
					<div className="stat">
						<div className="stat-figure text-indigo-500">
							<MdCamera className="text-6xl" />
						</div>
						<div className="stat-title text-slate-500">Gallery</div>
						<div className="stat-value text-slate-600">{images}<small style={{fontWeight:200, fontSize: '70%'}}>/{galleryLimit}</small></div>
						<div className="stat-desc">Fotos</div>
						<div className="stat-actions text-right">
							<NavLink to={"/gallery"} className="btn btn-sm btn-info btn-outline">
								Edit
							</NavLink>
						</div>
					</div>
				</div>

				<div className="stats shadow bg-base-100">
					<div className="stat">
						<div className="stat-figure text-indigo-500">
							<MdPeopleAlt className="text-6xl" />
						</div>
						<div className="stat-title text-slate-500">Accounts</div>
						<div className="stat-value text-slate-600">{accounts}</div>
						<div className="stat-actions text-right">
							<NavLink to={"/accounts"} className="btn btn-sm btn-info btn-outline">
								Edit
							</NavLink>
						</div>
					</div>
				</div>

			</div>
		</>
	);
}

export default Home;