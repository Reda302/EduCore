import Pagination from "@/components/Pagination";
import Table from "@/components/Table";
import TableSearch from "@/components/TableSearch";
import { examsData, resultsData, role } from "@/lib/data";
import prisma from "@/lib/prisma";
import { ITEM_PER_PAGE } from "@/lib/settings";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";

type ResultList = {
      id: number;
      title:string;
      studentName:string;
      studentSurname:string;
      teacherName:string;
      teacherSurname:string;
      score:number;
      className:string;
      startTime: Date;
}

const columns = [
  {
    header: "Title",
    accessor: "name",
  },
  {
    header: "Student",
    accessor: "student",
  },
  {
    header: "Score",
    accessor: "score",
    className: "hidden md:table-cell",
  },
  {
    header: "Class",
    accessor: "class",
    className: "hidden md:table-cell",
  },
  {
    header: "Teacher",
    accessor: "teacher",
    className: "hidden md:table-cell",
  },
  {
    header: "Date",
    accessor: "date",
    className: "hidden md:table-cell", // Fix: Added colon
  },
  {
    header: "Actions",
    accessor: "actions",
  },
];

const renderRow = (item: ResultList) => (
  <tr
    key={item.id}
    className="border-b border-gray-200 even:bg-slate-50 text-sm hover:bg-redapurplelight transition-colors duration-200 cursor-pointer"
  >
    <td className="flex items-center gap-4 p-4 font-semibold">{item.title}</td>
    <td>{item.studentName + " " + item.teacherSurname}</td>
    <td className="hidden md:table-cell">{item.score}</td>
    <td className="hidden md:table-cell">{item.teacherName + " " + item.teacherSurname}</td>
    <td className="hidden md:table-cell">{item.className}</td>
    <td className="hidden md:table-cell">{new Intl.DateTimeFormat("en-US").format(item.startTime)}</td>

    <td>
      <div className="flex items-center gap-2">
        <Link href={`/list/teachers/${item.id}`}>
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-redasky transition-transform duration-300 hover:scale-110 active:scale-100">
            <Image src="/Edit.png" alt="" width={16} height={16} />
          </button>
        </Link>
        {role === "admin" && (
          <button className="w-7 h-7 flex items-center justify-center rounded-full bg-redapurple transition-transform duration-300 hover:scale-110 active:scale-100">
            <Image src="/delete.png" alt="Delete" width={16} height={16} />
          </button>
        )}
      </div>
    </td>
  </tr>
);
const ResultListPage = async ({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {
  const { page, ...queryParams } = searchParams;

  const p = page ? parseInt(page) : 1;

  //URL PARAMS CONDITIONS

  // 1. Create empty filter object for Prisma
  const query: Prisma.ResultWhereInput = {};

  // 2. If there are query params in the URL
  if (queryParams) {
    for (const [key, value] of Object.entries(queryParams)) {
      if (value !== undefined) {
        switch (key) {
          case "studentId":
            query.studentId = value;
            break;
          case "search":
            query.OR = [
              {exam:{title:{contains:value,mode: "insensitive"}}},
              {student:{name:{contains:value,mode: "insensitive"}}},

            ];
            break;
          default:
            break;
        }
      }
    }
  }

  const [dataRes, count] = await prisma.$transaction([
    prisma.result.findMany({
      //queryParams here soon
      where: query,
      include: {
        student: { select: { name: true, surname: true } },
        exam: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
          assignment: {
          include: {
            lesson: {
              select: {
                class: { select: { name: true } },
                teacher: { select: { name: true, surname: true } },
              },
            },
          },
        },
      },
      take: ITEM_PER_PAGE,
      skip: ITEM_PER_PAGE * (p - 1),
    }),
    prisma.result.count({ where: query }),
  ]);

  const data = dataRes.map(item =>{
    const assessment = item.exam || item.assignment
    if(!assessment) return null ;
    const isExam = "startTime" in assessment;

    return{
      id: item.id,
      title:assessment.title,
      studentName:item.student.name,
      studentSurname:item.student.surname,
      teacherName:assessment.lesson.teacher.name,
      teacherSurname:assessment.lesson.teacher.surname,
      score:item.score,
      className:assessment.lesson.class.name,
      startTime: isExam ? assessment.startTime: assessment.startDate,

    };
  });

  return (
    <div className="bg-white p-4 rounded-md flex-1 m-4 mt-0">
      {/* TOP */}
      <div className="flex items-center justify-between">
        <h1 className="hidden md:block text-lg font-semibold">
          Results Overview
        </h1>
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
      <Table columns={columns} renderRow={renderRow} data={data} />
      {/* PAGINATION */}
      <div className="">
        <Pagination page={p} count={count} />
      </div>
    </div>
  );
};

export default ResultListPage;
