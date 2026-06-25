import React from 'react'
import { ChefHat, House, Heart, Search } from 'lucide-react';
import { NavLink } from 'react-router';

export default function NavBar() {
    return (
        <>


            <header className="fixed w-full z-20 top-0 inset-s-0 bg-amber-50">
                <nav >
                    <div className="flex items-center justify-center gap-2 p-2">
                        <a href="/" className="flex items-center space-x-3">
                            <ChefHat className="w-10 h-10 text-amber-600" />
                            <span className="text-slate-900 font-bold">GOURMET</span>
                        </a>
                    </div>
                </nav>
                
                <nav>
                    <div className="max-w-7xl px-3 py-2 mx-auto">
                        <div className="flex items-center justify-center">
                            <ul className="flex flex-row mt-0 space-x-8 text-sm">
                                <li>
                                    <NavLink to="/" className={({ isActive }) =>
                                        isActive
                                            ? " flex items-center bg-amber-500 text-white gap-x-2 px-3 py-2 rounded-full"
                                            : "flex items-center gap-x-2 px-3 py-2 rounded-full hover:bg-orange-200"
                                    } >  <House className="w-4 h-4" />
                                        <span className="text-xs font-medium">Home</span>

                                    </NavLink>
                                </li>

                                 <li>
                                    <NavLink to="discover" className={({ isActive }) =>
                                        isActive
                                            ? " flex items-center bg-amber-500 text-white gap-x-2 px-3 py-2 rounded-full"
                                            : "flex items-center gap-x-2 px-3 py-2 rounded-full hover:bg-orange-200"
                                    } ><Search className="w-4 h-4" />
                                        <span className="text-xs font-medium">Discover</span>
                                    </NavLink>
                                </li>

                                <li>
                                    <NavLink to="favorites" className={({ isActive }) =>
                                        isActive
                                            ? " flex items-center bg-amber-500 text-white gap-x-2 px-3 py-2 rounded-full"
                                            : "flex items-center gap-x-2 px-3 py-2 rounded-full hover:bg-orange-200"
                                    } ><Heart className="w-4 h-4" />
                                        <span className="text-xs font-medium">Favorites</span>
                                    </NavLink>
                                </li>



                            </ul>
                        </div>
                    </div>
                </nav>
            </header>


        </>
    )
}
