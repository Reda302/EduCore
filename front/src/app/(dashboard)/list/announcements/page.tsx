import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { announcementsData, eventsData, examsData, resultsData, role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Announcement, Class, Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type AnnouncenemtList = Announcement & { class: Class };

const columns = [
 
  {
    header:"Title",
    accessor:"title",
  },
  {
    header:"Class",
    accessor:"class",
    

  },
  {
    header:"Date",
    accessor:"date",
    className:"hidden md:table-cell",

  },
  
  {
    header:"Actions",
    accessor:"actions",
  },
  
];
const renderRow = (item: AnnouncenemtList) =>(
    <tr
  key={item.id}
  className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-redapurplelight transition-colors duration-200 cursor-pointer"
>
      <td className="flex items-center gap-4 p-4 font-semibold">{item.title}</td>
      <td>{item.class.name}</td>
      <td className="hidden md:table-cell">
        {" "}
        {new Intl.DateTimeFormat("en-US").format(item.date)}
        </td>
      <td>
        <div className="flex items-center gap-2">
         
         {role === "admin" && (
            <>
              <FormModal table="announcement" type="update" data={item} />
              <FormModal table="announcement" type="delete" id={item.id} />
            </>
          )}
        </div>
      </td>
    </tr>
  );
  
const AccnouncementListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  //URL PARAMS CONDITIONS

  // 1. Create empty filter object for Prisma
const query: Prisma.AnnouncementWhereInput = {};

// 2. If there are query params in the URL
if (queryParams) {
  for (const [key, value] of Object.entries(queryParams)) {
    if (value !== undefined) {
      switch (key) {
        case "classId": 
          // Example: ?classId=3
          // Find teachers that have AT LEAST ONE lesson with this classId
          case "search":
            query.title = {contains:value, mode:"insensitive"};
            break;
            default:
            break;
        }
      }
  }
}

  const [data, count] = await prisma.$transaction([
    prisma.announcement.findMany({
      //queryParams here soon
      where: query,
      include: {
        class: true,
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.announcement.count({where: query}),
  ]);


  

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Announcements Overview</h1>
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto ">
        <TableSearch />
        <div className="flex items-center gap-4 self-end">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-redayellow hover:opacity-80 active:scale-95 transition">
            <Image src="/sort.png" alt="" width={14} height={14} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-redayellow hover:opacity-80 active:scale-95 transition">
            <Image src="/filter.png" alt="" width={14} height={14} />
          </button>
          {role === "admin" && (
              <FormModal table="announcement" type="create" />
          )}
        </div>
      </div>

      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data}/>
      {/* PAGINATION */}
      <div className="">
        <Pagination page={p} count={count}/>

      </div>


    </div>
  );
};

export default AccnouncementListPage;