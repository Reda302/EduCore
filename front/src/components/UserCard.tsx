import Image from "next/image";

const UserCard = ({type}:{type:string}) =>{
  return (
    <div className="rounded-2xl odd:bg-redapurple even:bg-redayellow p-4 flex-1 min-w-[130px] cursor-pointer 
hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ">
      <div className="flex items-center justify-between">
        <span className="text-[10px] bg-white px-2 py-1 rounded-full text-green-500">2025/10</span>
        <Image src="/more.png" alt="" width={20} height={20} />
      </div>
      <h1 className="text-2xl font-semibold my-4 ">1218</h1>
      <h2 className="capitalize test-sm font-medium text-gray-500 ">{type}</h2>
    </div> 
  );
};

export default UserCard;