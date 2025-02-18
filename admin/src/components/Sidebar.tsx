import React from 'react';
import {
	MdAccountBalance,
	MdOutlineApps,
	MdOutlineCameraEnhance,
	MdOutlineAutoStories,
	MdOutlineCases,
	MdAccountCircle,
	MdLogout,
	MdOutlineBallot,
} from "react-icons/md";
import { NavLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const Sidebar: React.FC<{ isOpen: boolean }> = ({ isOpen }) => {
	const {logout} = useAuth();
	
	const handleLogout = () => {
		logout();
	}

 	return (
		<aside
			className={`drawer fixed lg:pt-14 lg:h-screen top-0 left-0 w-56 bg-gray-200 h-full lg:z-10 z-50 border-r border-gray-300 transform ${
				isOpen ? "translate-x-0" : "-translate-x-full"
			} lg:translate-x-0 transition-transform duration-200 ease-in-out`}
		>
			<div className="p-4 h-full overflow-y-auto">
				<ul className="menu p-1 pt-4 w-48 bg-gray-200 text-base-content">
					<li>
						<NavLink to="/" className="group text-sm text-gray-500 p-3 my-1">
							<span>
								<MdOutlineApps className="text-xl" />
							</span>
							<span>Dashboard</span>
						</NavLink>
					</li>
					
					<li>
						<NavLink to="/accounts" className="group text-sm text-gray-500 p-3 my-1">
							<span>
								<MdAccountCircle className="text-xl" />
							</span>
							<span>Accounts</span>
						</NavLink>
					</li>
					<li>
						<NavLink to="/business" className="group text-sm text-gray-500 p-3 my-1">
							<span>
								<MdAccountBalance className="text-xl" />
							</span>
							<span>Business</span>
						</NavLink>
					</li>
					<li>
						<NavLink to="/categories" className="group text-sm text-gray-500 p-3 my-1">
							<span>
								<MdOutlineBallot className="text-xl" />
							</span>
							<span>Categories</span>
						</NavLink>
					</li>
					<li>
						<NavLink to="/offers" className="group text-sm text-gray-500 p-3 my-1">
							<span>
								<MdOutlineCameraEnhance className="text-xl" />
							</span>
							<span>Offers</span>
						</NavLink>
					</li>
					<li>
						<NavLink to="/services" className="group text-sm text-gray-500 p-3 my-1">
							<span>
								<MdOutlineCases className="text-xl" />
							</span>
							<span>Services</span>
						</NavLink>
					</li>
					<li>
						<NavLink to="/gallery" className="group text-sm text-gray-500 p-3 my-1">
							<span>
								<MdOutlineAutoStories className="text-xl" />
							</span>
							<span>Gallery</span>
						</NavLink>
					</li>
					<li></li>
					<li className='sm:invisible visible'>
						<a onClick={handleLogout} className="group text-sm text-gray-500 p-3 my-1">
							<span>
								<MdLogout className="text-xl" />
							</span>
							<span>Logout</span>
						</a>
					</li>
				</ul>
			</div>
		</aside>
  );
};

export default Sidebar;
