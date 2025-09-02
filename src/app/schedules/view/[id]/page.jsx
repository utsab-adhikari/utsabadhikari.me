// app/schedules/view/[id]/page.js
"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { 
  FiArrowLeft, 
  FiEdit, 
  FiTrash2, 
  FiCalendar, 
  FiClock,
  FiAlertCircle
} from "react-icons/fi";

// Countdown component for each schedule item
function CountdownTimer({ targetDate, time }) {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  
  function calculateTimeLeft() {
    if (!targetDate) return {};
    
    // Combine date and time if both are provided
    let targetDateTime = new Date(targetDate);
    if (time) {
      const [hours, minutes] = time.split(':');
      targetDateTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
    }
    
    const now = new Date();
    const difference = targetDateTime - now;
    
    if (difference <= 0) {
      return { expired: true };
    }
    
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60)
    };
  }
  
  useEffect(() => {
    if (!targetDate) return;
    
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);
    
    return () => clearInterval(timer);
  }, [targetDate, time]);
  
  if (!targetDate) {
    return (
      <div className="text-xs text-[#8b949e] mt-1">
        No date specified
      </div>
    );
  }
  
  if (timeLeft.expired) {
    return (
      <div className="text-xs text-[#f85149] mt-1 flex items-center">
        <FiAlertCircle className="mr-1" /> Event has passed
      </div>
    );
  }
  
  return (
    <div className="mt-2 p-2 bg-[#0d1117] border border-[#30363d] rounded-md">
      <div className="text-xs text-[#8b949e] mb-1">Time remaining:</div>
      <div className="flex justify-between text-sm">
        {timeLeft.days > 0 && (
          <div className="flex flex-col items-center">
            <span className="font-bold text-[#f0f6fc]">{timeLeft.days}</span>
            <span className="text-xs text-[#8b949e]">days</span>
          </div>
        )}
        <div className="flex flex-col items-center">
          <span className="font-bold text-[#f0f6fc]">{timeLeft.hours}</span>
          <span className="text-xs text-[#8b949e]">hours</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-[#f0f6fc]">{timeLeft.minutes}</span>
          <span className="text-xs text-[#8b949e]">mins</span>
        </div>
        <div className="flex flex-col items-center">
          <span className="font-bold text-[#f0f6fc]">{timeLeft.seconds}</span>
          <span className="text-xs text-[#8b949e]">secs</span>
        </div>
      </div>
    </div>
  );
}

export default function ScheduleView() {
  const router = useRouter();
  const { id } = useParams();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  const [schedule, setSchedule] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSchedule();
  }, [id]);

  const fetchSchedule = async () => {
    try {
      const res = await fetch(`/api/schedules/${id}`);
      const scheduleData = await res.json();
      setSchedule(scheduleData);
    } catch (error) {
      console.error("Error fetching schedule:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteSchedule = async () => {
    if (!confirm("Are you sure you want to delete this schedule?")) return;
    
    try {
      const res = await fetch(`/api/schedules/${id}`, { method: "DELETE" });
      if (res.ok) {
        router.push("/schedules");
      }
    } catch (error) {
      console.error("Error deleting schedule:", error);
    }
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return "No date specified";
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#3fb950]"></div>
      </div>
    );
  }

  if (!schedule) {
    return (
      <div className="min-h-screen bg-[#0d1117] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-[#f0f6fc] mb-4">Schedule not found</h1>
          <button
            onClick={() => router.push("/schedules")}
            className="text-[#58a6ff] hover:underline"
          >
            Back to schedules
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0d1117] text-[#c9d1d9] p-4 sm:p-6">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={() => router.back()}
          className="flex items-center text-[#58a6ff] hover:text-[#79c0ff] mb-6 text-sm sm:text-base"
        >
          <FiArrowLeft className="mr-2" /> Back to Schedules
        </button>

        <div className="bg-[#161b22] border border-[#30363d] rounded-md overflow-hidden">
          <div className="border-b border-[#30363d] px-4 py-3 sm:px-6 sm:py-4 bg-[#161b22] flex justify-between items-center">
            <h1 className="text-lg sm:text-xl font-bold text-[#f0f6fc]">{schedule.title}</h1>
            {isAdmin && (
              <div className="flex space-x-2">
                <button
                  onClick={() => router.push(`/schedules/edit/${schedule._id}`)}
                  className="text-[#8b949e] hover:text-[#58a6ff] p-1"
                  aria-label="Edit schedule"
                >
                  <FiEdit size={18} />
                </button>
                <button
                  onClick={deleteSchedule}
                  className="text-[#8b949e] hover:text-[#f85149] p-1"
                  aria-label="Delete schedule"
                >
                  <FiTrash2 size={18} />
                </button>
              </div>
            )}
          </div>

          <div className="p-4 sm:p-6 space-y-6">
            <div>
              <h2 className="text-sm font-medium mb-2 text-[#f0f6fc]">Description</h2>
              <p className="text-[#c9d1d9] whitespace-pre-wrap">{schedule.description}</p>
            </div>

            {schedule.content && schedule.content.length > 0 && (
              <div>
                <h2 className="text-sm font-medium mb-4 text-[#f0f6fc]">Schedule Items</h2>
                <div className="space-y-3">
                  {schedule.content.map((item, index) => (
                    <div key={index} className="bg-[#0d1117] border border-[#30363d] rounded-md p-4">
                      <h3 className="font-medium text-[#f0f6fc] mb-2">{item.subTitle}</h3>
                      <div className="flex flex-col sm:flex-row sm:items-center text-sm text-[#8b949e] gap-2 sm:gap-4">
                        {item.date && (
                          <div className="flex items-center">
                            <FiCalendar className="mr-1 flex-shrink-0" />
                            <span>{formatDate(item.date)}</span>
                          </div>
                        )}
                        {item.time && (
                          <div className="flex items-center">
                            <FiClock className="mr-1 flex-shrink-0" />
                            <span>{item.time}</span>
                          </div>
                        )}
                      </div>
                      <CountdownTimer targetDate={item.date} time={item.time} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="pt-4 border-t border-[#30363d] text-sm text-[#8b949e]">
              <p>Created: {new Date(schedule.createdAt).toLocaleString()}</p>
              <p>Last updated: {new Date(schedule.updatedAt).toLocaleString()}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}