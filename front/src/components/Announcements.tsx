const Announcements = () => {
  return (
    <div className="bg-white p-4 rounded-md">
      <div className="flex items-center justify-between">
      <h1 className="text-xl font-extrabold cursor-pointer ">Announcements</h1>
      <span className="cursor-pointer text-xs text-gray-400 ">View all</span>
      </div>
      <div className="flex flex-col gap-4 mt-4">
      <div className="bg-redaskylight rounded-md p-4 ">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-sm">Upcoming Parent-Teacher Meeting</h2>
          <span className="text-sm text-gray-400 bg-white rounded-md px-1 py-1">2025-04-28</span>
          </div>
          <p className="text-sm text-gray-400 mt-1">Parent-teacher conferences will be held april 28. Please check your schedules and book your slots early.</p>
        </div>

        <div className="bg-redapurplelight rounded-md p-4 ">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-sm">Exam Week Notice</h2>
          <span className="text-sm text-gray-400 bg-white rounded-md px-1 py-1">2025-05-3</span>
          </div>
          <p className="text-sm text-gray-400 mt-1">All students are advised to revise the syllabus thoroughly and check exam timetables.</p>

        </div>

        <div className="bg-redayellowlight rounded-md p-4 ">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-sm">Library Renovation</h2>
          <span className="text-sm text-gray-400 bg-white rounded-md px-1 py-1">2025-05-11</span>
          </div>
          <p className="text-sm text-gray-400 mt-1">The school library will be closed for renovations. Thank you for your understanding.</p>

        </div>

        
      </div>
    </div>
  );
};

export default Announcements;
