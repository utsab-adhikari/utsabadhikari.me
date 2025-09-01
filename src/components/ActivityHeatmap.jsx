"use client";
import React, { useEffect, useState } from "react";

export default function ActivityHeatmap() {
  const [data, setData] = useState({
    activityByMonth: {},
    latestActivities: [],
  });

  useEffect(() => {
    fetch("/api/activity")
      .then((res) => res.json())
      .then((data) => setData(data));
  }, []);

  const { activityByMonth, latestActivities } = data;

  // Function to get activity count for a specific date
  const getActivityCount = (date) => {
    const dateStr = date.toISOString().split("T")[0];
    for (const monthKey in activityByMonth) {
      if (activityByMonth[monthKey][dateStr]) {
        return activityByMonth[monthKey][dateStr];
      }
    }
    return 0;
  };

  // Function to get color class based on activity count
  const getActivityColor = (count) => {
    if (count === 0) return "bg-[#161b22] border border-[#30363d]";
    if (count === 1) return "bg-[#0e4429]";
    if (count === 2) return "bg-[#006d32]";
    if (count === 3) return "bg-[#26a641]";
    return "bg-[#39d353]";
  };

  // Format date for display
  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return date.toLocaleString("default", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  // Get all dates from the start of the year to today
  const getYearToDateDates = () => {
    const dates = [];
    const today = new Date();
    const startOfYear = new Date(today.getFullYear(), 0, 1);

    // Adjust to the most recent Sunday (LeetCode starts weeks on Sunday)
    const firstSunday = new Date(startOfYear);
    firstSunday.setDate(firstSunday.getDate() - firstSunday.getDay());

    for (
      let d = new Date(firstSunday);
      d <= today;
      d.setDate(d.getDate() + 1)
    ) {
      dates.push(new Date(d));
    }

    return dates;
  };

  // Group dates by week and add month information
  const groupDatesByWeekWithMonths = (dates) => {
    const weeks = [];
    let currentWeek = [];
    let currentMonth = dates[0]?.getMonth() || 0;

    dates.forEach((date, index) => {
      // Check if we're starting a new month
      const dateMonth = date.getMonth();
      if (dateMonth !== currentMonth && currentWeek.length > 0) {
        // Push the current week and add month separator
        weeks.push({
          days: [...currentWeek],
          month: currentMonth,
          isMonthStart: true,
        });
        currentWeek = [];
        currentMonth = dateMonth;
      } else {
        currentWeek.push(date);
      }

      // If we have 7 days or it's the last date
      if (currentWeek.length === 7 || index === dates.length - 1) {
        weeks.push({
          days: [...currentWeek],
          month: currentMonth,
          isMonthStart: weeks.length === 0, // First week is always a month start
        });
        currentWeek = [];
      }
    });

    return weeks;
  };

  // Get month name from index
  const getMonthName = (monthIndex) => {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return months[monthIndex];
  };

  // Generate all dates and group by week with month information
  const allDates = getYearToDateDates();
  const weeksWithMonths = groupDatesByWeekWithMonths(allDates);
  const todayStr = new Date().toISOString().split("T")[0];

  return (
    <div className="bg-[#0d1117] text-[#c9d1d9] p-6 rounded-lg border border-[#30363d]">
      {/* Yearly Heatmap */}
      <div className="mb-8">
        <div className="flex items-start gap-1">
          {/* Day labels */}
          <div className="flex flex-col justify-around h-[140px] mr-2 text-xs text-[#8b949e]">
            <span>Sun</span>
            <span>Mon</span>
            <span>Tue</span>
            <span>Wed</span>
            <span>Thu</span>
            <span>Fri</span>
            <span>Sat</span>
          </div>

          {/* Heatmap grid with month separators */}
          <div className="flex gap-1 overflow-x-auto pb-2">
            {weeksWithMonths.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col">
                {/* Month label above the week if it's the start of a new month */}
                {week.isMonthStart && (
                  <div className="text-xs text-[#8b949e] text-center mb-1 h-4">
                    {getMonthName(week.month)}
                  </div>
                )}

                {/* Week days */}
                <div className="flex flex-col gap-1 flex-grow justify-end">
                  {week.days.map((date, dayIndex) => {
                    const dateStr = date.toISOString().split("T")[0];
                    const activityCount = getActivityCount(date);
                    const isToday = dateStr === todayStr;
                    const isFuture = date > new Date();

                    // Don't render future dates
                    if (isFuture) {
                      return null;
                    }

                    return (
                      <div
                        key={dateStr}
                        className={`w-3 h-3 rounded-sm ${getActivityColor(
                          activityCount
                        )} ${isToday ? "ring-1 ring-[#f78166]" : ""}`}
                        title={`${date.toLocaleDateString()}: ${activityCount} activities`}
                      />
                    );
                  })}
                </div>

                {/* Add spacing after each month */}
                {weekIndex < weeksWithMonths.length - 1 &&
                  week.month !== weeksWithMonths[weekIndex + 1].month && (
                    <div className="w-2"></div>
                  )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center mt-4 text-xs text-[#8b949e]">
          <span className="mr-2">Less</span>
          <div className="w-3 h-3 rounded-sm bg-[#161b22] border border-[#30363d] mr-1" />
          <div className="w-3 h-3 rounded-sm bg-[#0e4429] mr-1" />
          <div className="w-3 h-3 rounded-sm bg-[#006d32] mr-1" />
          <div className="w-3 h-3 rounded-sm bg-[#26a641] mr-1" />
          <div className="w-3 h-3 rounded-sm bg-[#39d353] mr-1" />
          <span className="ml-2">More</span>
        </div>

        <p className="text-xs text-[#8b949e] mt-2">
          Total contributions:{" "}
          {allDates.reduce((sum, date) => sum + getActivityCount(date), 0)}
        </p>
      </div>

      {/* Latest Activities */}
      <div>
        <h3 className="text-lg font-medium mb-4 text-[#f0f6fc]">
          Recent Activity
        </h3>
        <div className="space-y-3">
          {latestActivities
            .filter((activity) => new Date(activity.date) <= new Date())
            .slice(0, 8)
            .map((item, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 bg-[#161b22] rounded-md border border-[#30363d] hover:bg-[#1c212a] transition-colors"
              >
                <div className="flex items-center">
                  <div
                    className={`w-3 h-3 rounded-full mr-3 ${
                      item.type === "Article"
                        ? "bg-[#a5d6ff]"
                        : item.type === "CppFile"
                        ? "bg-[#ffab70]"
                        : "bg-[#d2a8ff]"
                    }`}
                  />
                  <span className="text-sm font-medium text-[#f0f6fc]">
                    {item.title}
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-xs px-2 py-1 rounded-full bg-[#21262d] text-[#8b949e]">
                    {item.type}
                  </span>
                  <span className="text-xs text-[#8b949e]">
                    {formatDate(item.date)}
                  </span>
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-4 border-t border-[#30363d] text-xs text-[#8b949e] text-center">
        <p>Utsab Adhikari Activity Tracker • {new Date().getFullYear()}</p>
      </div>
    </div>
  );
}
