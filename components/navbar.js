// Social Icons
import { SiInstagram } from "react-icons/si";
import { FaYoutube, FaFacebook, FaTwitter } from "react-icons/fa";

// UI Icons
import { BsTelephone, BsCart2 } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { IoSearchOutline, IoPersonOutline } from "react-icons/io5";
import { FiHeart } from "react-icons/fi";
import { FiChevronDown } from "react-icons/fi";




export default function navbar() {
  return (
    <div className="">
        {/*Top Bar*/}
        <div className="w-full bg-teal-700 text-white text-sm p-2">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
            
                {/* Left: Phone + Email */}
                <div className="flex items-center gap-6">
                <span className="flex items-center gap-2">
                    <BsTelephone/> (225) 555-0118
                </span>
                <span className="flex items-center gap-2">
                    <MdOutlineEmail/> michelle.rivera@example.com
                </span>
                </div>

                {/* Middle: Promo */}
                <div className="hidden md:block font-semibold">
                Follow Us and get a chance to win 80% off
                </div>

                {/* Right: Social icons */}
                <div className="flex items-center gap-4 text-lg">
                    <span className="text-sm">Follow Us :</span>

                    <div className="flex gap-3 text-white items-center">
                        <SiInstagram className="w-5 h-5 text-white" />
                        <FaYoutube className="w-5 h-5 text-white" />
                        <FaFacebook className="w-5 h-5 text-white" />
                        <FaTwitter className="w-5 h-5 text-white" />
                    </div>
                </div>
            </div>
        </div>




        {/*Bottom Bar */}
        <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">
            <span className="text-xl font-semibold">Bookstar</span>

            <div className="flex justify-evenly gap-6">

            <span className="cursor-pointer hover:text-teal-600">Home</span>

            {/* SHOP + DROPDOWN */}
            <div className="relative group">
                <span className="flex items-center gap-1 cursor-pointer font-medium text-gray-700 group-hover:text-teal-600">
                Shop
                <FiChevronDown className="w-4 h-4 transition-transform duration-200 group-hover:rotate-180" />
                </span>

                <div className="absolute left-0 top-6 hidden group-hover:flex flex-col bg-white shadow-md rounded-md w-40 p-3 gap-2 text-sm z-50">
                <span className="cursor-pointer hover:text-teal-600">All Products</span>
                <span className="cursor-pointer hover:text-teal-600">Best Seller</span>
                <span className="cursor-pointer hover:text-teal-600">Categories</span>
                </div>
            </div>

            <span className="cursor-pointer hover:text-teal-600">About</span>
            <span className="cursor-pointer hover:text-teal-600">Blog</span>
            <span className="cursor-pointer hover:text-teal-600">Contact</span>
            <span className="cursor-pointer hover:text-teal-600">Pages</span>

            </div>



            <div className="flex justify-between text-blue-400 gap-10">
                <div className="flex gap-3">
                <IoPersonOutline size={22} />
                <span>  Login / Register</span>
                </div>

                <div><IoSearchOutline/></div>
                <div><BsCart2/></div>
                <div><FiHeart/></div>
            </div>
        </div>
    </div>

  );
}
