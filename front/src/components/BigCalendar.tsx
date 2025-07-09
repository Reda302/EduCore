"use client";

import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
import { generateCalendarEvents } from "@/lib/data";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { useState } from "react";

const localizer = momentLocalizer(moment);

const BigCalendar = () => {
  const [view, setView] = useState<View>(Views.WORK_WEEK);

  const handleOnChangeView = (selectedView: View) => {
    setView(selectedView);
  };

  const dayStart = new Date();
  dayStart.setHours(8, 0, 0, 0);

  const dayEnd = new Date();
  dayEnd.setHours(17, 0, 0, 0);

  return (
    <Calendar
      localizer={localizer}
      events={generateCalendarEvents()}
      startAccessor="start"
      endAccessor="end"
      views={["work_week", "day"]}
      view={view}
      style={{ height: "98%" }}
      onView={handleOnChangeView}
      min={dayStart}
      max={dayEnd}
    />
  );
};

export default BigCalendar;
