import Image from "next/image";

const Navbar = () => {
  return (
    <div className="flex items-center justify-between p-4">
      {/* Search Bar */}
      <div className="hidden md:flex items-center gap-2 text-xs rounded-full ring-[1.5px] ring-gray-300 px-2 ">
        <Image src={"/search.png"} alt="" width={14} height={14} />
        <input type="text" placeholder="Search" className="w-[200px] p-2 bg-transparent outline-none" />
      </div>
      {/* ICONS AND USER */}
      <div className="flex items-center gap-6 w-full justify-end ">
        <div className="bg-white rounded-full flex justify-center items-center cursor-pointer ">
          <Image src="/message.png" alt="" width={20} height={20} className="hover:scale-125 transition-transform duration-200 ease-in-out active:scale-105" />
         </div>
         <div className="bg-white rounded-full flex justify-center items-center cursor-pointer relative ">
          <Image src="/announcement.png" alt="" width={20} height={20} className="hover:scale-125 transition-transform duration-200 ease-in-out active:scale-105 "/>
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-purple-400 flex items-center justify-center text-white rounded-full text-xs">1</div>
         </div>
         <div className="flex flex-col">
          <span className="text-xs leading-3 font-medium cursor-pointer hover:text-blue-500 transition-colors duration-300 ">Reda Bahous</span>
          <span className="text-[10px] text-gray-500 text-right cursor-pointer ">Admin</span>
         </div>
         <Image src="/avatar.png" alt="" width={36} height={36} className="rounded-full cursor-pointer hover:scale-125 transition-transform duration-200 ease-in-out active:scale-105"/>
      </div>
      
      

    </div>
  );
};

export default Navbar;