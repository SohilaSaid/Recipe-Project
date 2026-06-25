import React from 'react'
import { Link } from 'react-router'
import { MoveRight  } from 'lucide-react'

export default function Footer() {
    return (
        <>
            <div className='text-white flex justify-center bg-amber-500 rounded-full p-10 m-10'>
                <div className='flex items-center flex-col '>
                    <h2 className='font-bold'>Ready to Start Cooking?</h2>
                    <p className="text-center">Join thousands of home cooks discovering new recipes every day</p>
                    <Link to="discover" className="text-amber-500 bg-amber-50 hover:bg-orange-200 shadow-xs font-medium rounded-full text-sm px-4 py-2 m-2 flex items-center gap-x-1">Explore All Recipes 
                         <span><MoveRight className='pt-1' /></span>
                    </Link>
                </div>
            </div>
        </>
    )
}
