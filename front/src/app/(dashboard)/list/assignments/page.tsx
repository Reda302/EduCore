import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { assignmentsData, examsData, role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Assignment, Class, Exam, Prisma, Subject, Teacher } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type Assignmentlist = Assignment & {lesson:{
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
    header: "Due Date",
    accessor: "dueDate",
    className: "hidden md:table-cell", // Fix: Added colon
  },
  {
    header:"Actions",
    accessor:"actions",
  },
  
];
const renderRow = (item: Assignmentlist) =>(
    <tr
  key={item.id}
  className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-redapurplelight transition-colors duration-200 cursor-pointer"
>
      <td className="flex items-center gap-4 p-4 font-semibold">{item.lesson.subject.name}</td>
      <td>{item.lesson.class.name}</td>
      <td className="hidden md:table-cell">{item.lesson.teacher.name + " " + item.lesson.teacher.surname}</td>
      <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(item.dueDate)}</td>


      <td>
        <div className="flex items-center gap-2">
          <Link href={`/list/teachers/${item.id}`}>
            <button className="w-7 h-7 flex items-center justify-center rounded-full bg-redasky transition-transform duration-300 hover:scale-110 active:scale-100">
            <Image src="/Edit.png" alt="" width={16} height={16} />
            </button>
          </Link>
          {role==="admin" && (
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-redapurple transition-transform duration-300 hover:scale-110 active:scale-100">
            <Image src="/delete.png" alt="Delete" width={16} height={16} />
          </button>
          )}
        </div>
      </td>
    </tr>
  );

  
const AssignmentListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  //URL PARAMS CONDITIONS

  // 1. Create empty filter object for Prisma
  const query: Prisma.AssignmentWhereInput = {};

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
    prisma.assignment.findMany({
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
    prisma.assignment.count({ where: query }),
  ]);


  

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">Assignments Overview</h1>
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
          <button className="w-8 h-8 flex items-center justify-center rounded-full bg-redayellow hover:opacity-80 active:scale-95 transition">
            <Image src="/plus.png" alt="" width={14} height={14} />
          </button>
          )}
        </div>
      </div>

      </div>
      {/* LIST */}
      <Table columns={columns} renderRow={renderRow} data={data}/>
      {/* PAGINATION */}
      <div className="">
        <Pagination page={p} count={count} />

      </div>


    </div>
  );
};

export default AssignmentListPage;