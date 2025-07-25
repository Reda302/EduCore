import Announcements from "@/components/Announcements";
import BigCalendar from "@/components/BigCalendar";
import Performance from "@/components/Performance";
import Image from "next/image";
import Link from "next/link";

const SingleStudentPage = () => {
  return (
    <div className="flex-1 p-4 flex flex-col xl:flex-row gap-4">
      {/* Left */}
      <div className="w-full xl:w-2/3">
        {/* Top */}
        <div className="flex flex-col lg:flex-row gap-4">
          {/* TEACHER CARD INFO */}
          <div className="bg-redasky py-6 px-4 rounded-md flex-1 flex gap-4 cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg">
            <div className="w-1/3">
              <Image
                src="https://images.pexels.com/photos/5414817/pexels-photo-5414817.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt=""
                width={144}
                height={144}
                className="w-36 h-36 rounded-full object-cover cursor-pointer transition-opacity duration-500 ease-in-out hover:opacity-80 active:opacity-90"
              />
            </div>
            <div className="w-2/3 flex flex-col justify-between gap-4 ">
              <h1 className="text-xl_ç___ààà(é&) font-semibold">
                Maelle Evans
              </h1>
              <p className="text-xs text-gray-500">
                An engaged learner who approaches each lesson with curiosity,
                commitment, and a positive mindset.
              </p>
              <div className="flex items-center justify-between gap-2 flex-wrap text-xs font-medium">
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/blood.png" alt="" width={14} height={14} />
                  <span>A+</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/date.png" alt="" width={14} height={14} />
                  <span>May 2025</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/mail.png" alt="" width={14} height={14} />
                  <span>Educore@outlook.fr</span>
                </div>
                <div className="w-full md:w-1/3 lg:w-full 2xl:w-1/3 flex items-center gap-2">
                  <Image src="/phone.png" alt="" width={14} height={14} />
                  <span>+2 126 954</span>
                </div>
              </div>
            </div>
          </div>
          {/* SMOL CARDS */}
          <div className="flex-1 flex gap-4 justify-between flex-wrap">
            {/*  CARD */}
            <div className="w-full bg-white p-4 rounded-md flex gap-6 md:w-[48%] xl:w-[45%] 2xl:w-[48%] items-center cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg  ">
              <Image
                src="/singleAttendance.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6 cursor-pointer "
              />
              <div className="">
                <h1 className="text-xl font-semibold">94%</h1>
                <span className="text-sm text-gray-400">Attendance</span>
              </div>
            </div>

            {/*  CARD */}
            <div className="w-full bg-white p-4 rounded-md flex gap-6 md:w-[48%] xl:w-[45%] 2xl:w-[48%] items-center cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg">
              <Image
                src="/singleBranch.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6 cursor-pointer"
              />
              <div className="">
                <h1 className="text-xl font-semibold">8th</h1>
                <span className="text-sm text-gray-400">Grade</span>
              </div>
            </div>

            {/*  CARD */}
            <div className="w-full bg-white p-4 rounded-md flex gap-6 md:w-[48%] xl:w-[45%] 2xl:w-[48%] items-center cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg">
              <Image
                src="/singleLesson.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6 cursor-pointer"
              />
              <div className="">
                <h1 className="text-xl font-semibold">18</h1>
                <span className="text-sm text-gray-400">Lessons</span>
              </div>
            </div>

            {/*  CARD */}
            <div className="w-full bg-white p-4 rounded-md flex gap-6 md:w-[48%] xl:w-[45%] 2xl:w-[48%] items-center cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg">
              <Image
                src="/singleClass.png"
                alt=""
                width={24}
                height={24}
                className="w-6 h-6 cursor-pointer"
              />
              <div className="">
                <h1 className="text-xl font-semibold">4A</h1>
                <span className="text-sm text-gray-400">classe Name</span>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div className="bg-white rounded-md p-4 mt-4 h-[800px]">
          <h1>Student&apos;s Schedule</h1>
          <BigCalendar />
        </div>
      </div>
      {/* Right */}
      <div className="w-full xl:w-1/3 flex flex-col gap-4">
        <div className="bg-white rounded-md p-4">
          <h1 className="text-xl font-semibold"> Shortcuts </h1>
          <div className="mt-4 gap-4 flex flex-wrap text-xs text-gray-500">
            <Link
              className="p-3 rounded-md bg-redaskylight cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg"
              href={`/list/lessons?classId=${2}`}
            >
              Student&apos;s Lessons{" "}
            </Link>
            <Link
              className="p-3 rounded-md bg-redapurplelight cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg"
              href={`/list/teachers?classId=${2}`}
            >
              Student&apos;s Teachers
            </Link>
            <Link
              className="p-3 rounded-md bg-redayellowlight cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg"
              href={`/list/exams?classId=${2}`}
            >
              Student&apos;s Exams
            </Link>
            <Link
              className="p-3 rounded-md bg-redaskylight cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg"
              href={`/list/assignments?classId=${2}`}
            >
              Student&apos;s Assignments
            </Link>
            <Link
              className="p-3 rounded-md bg-red-50 cursor-pointer transition-shadow duration-300 ease-in-out hover:shadow-lg"
              href={`/list/results?studentId=${"student2"}`}
            >
              Student&apos;s Results
            </Link>
          </div>
        </div>
        <Performance />
        <Announcements />
      </div>
    </div>
  );
};

export default SingleStudentPage;
