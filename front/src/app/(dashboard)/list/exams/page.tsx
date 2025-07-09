import FormModal from "@/components/FormModal";
import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { examsData, role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Class, Exam, Prisma, Subject, Teacher } from "@prisma/client";
import { count } from "console";
import { p } from "framer-motion/client";
import Image from "next/image";
import Link from "next/link";

type Examlist = Exam & {lesson:{
  subject:Subject,
  teacher:Teacher,
  class:Class,

}}

const columns = [
 
  {
    header:"Subject Name",
    accessor:"name",
  },
   {
    header:"Class",
    accessor:"class",

  },
    {
    header:"Teacher",
    accessor:"teacher",
    className:"hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell", // Fix: Added colon
  },
  {
    header:"Actions",
    accessor:"actions",
  },
  
];
 const renderRow = (item: Examlist) =>(
    <tr
  key={item.id}
  className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-redapurplelight transition-colors duration-200 cursor-pointer"
>
      <td className="flex items-center gap-4 p-4 font-semibold">{item.lesson.subject.name}</td>
      <td>{item.lesson.class.name}</td>
      <td className="hidden md:table-cell">{item.lesson.teacher.name + " " + item.lesson.teacher.surname}</td>
      <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(item.startTime)}</td>


      <td>
        <div className="flex items-center gap-2">
          
          {role==="admin" && (
              <>
                <FormModal table="exam" type="update" data={item} />
                <FormModal table="exam" type="delete" id={item.id} />
              </>
            )}
        </div>
      </td>
    </tr>
  );
const ExamListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  //URL PARAMS CONDITIONS

  // 1. Create empty filter object for Prisma
  const query: Prisma.ExamWhereInput = {};

  // 2. If there are query params in the URL
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "classId":
            query.lesson  = {classId: parseInt(value) };
            break;
          case "teacherId":
            query.lesson  = {
              teacherId: value,
            };
            break;
          case "search":
            query.lesson = {
                subject:{
              name: { contains: value, mode: "insensitive" },
            },
          };
            break;
          default:
            break;
        }
      }
    }
  }

  const [data, count] = await prisma.$transaction([
    prisma.exam.findMany({
      //queryParams here soon
      where: query,
      include: {
        lesson: {
          select: {
          subject: {select :{ name: true }},
          teacher: {select :{ name: true }},
          class: {select :{ name: true }},


           
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.exam.count({ where: query }),
  ]);


 

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Exams Overview</h1>
      <div className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto ">
        <TableSearch />
        <div className="flex items-center gap-4 self-end">
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-redayellow hover:opacity-80 active:scale-95 transition">
            <Image src="/sort.png" alt="" width={14} height={14} />
          </button>
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-redayellow hover:opacity-80 active:scale-95 transition">
            <Image src="/filter.png" alt="" width={14} height={14} />
          </button>
          {role === "admin" || role === "teacher" && <FormModal table="exam" type="create" />}
    
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

export default ExamListPage;