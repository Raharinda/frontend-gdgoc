import { SiInstagram } from "react-icons/si";
import { FaYoutube } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { BsTelephone } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";

export default function navbar() {
  return (
    <div>
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
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between">
            <span className="text-xl">Bookstar</span>
        </div>
    </div>

  );
}
