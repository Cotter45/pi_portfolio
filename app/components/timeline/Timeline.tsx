import { useEffect, useState } from "react";
import TimelineEvent from "./TimelineEvent";

export type TimelineEventType = {
  title: string;
  employer: string;
  startDate: Date;
  endDate: Date;
  description: string;
  skills: string[];
}

export default function Timeline() {
  const [events, setEvents] = useState<TimelineEventType[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getTimeline = async () => {
    const res = await fetch("/api/timeline");
    const data = await res.json();
    if (data.error) {
      setError(data.error);
    } else {
      setEvents(data.work);
    }
  };

  useEffect(() => {
    getTimeline();
  }, []);

  return (
    <div
      className="w-full flex flex-col items-center gap-6"
    >
      <div className="w-full">
        <h2 className="w-full text-3xl font-bold pl-10">My History</h2>
      </div>

      <div className="w-[84%] flex flex-col gap-2">
        {error && (
          <>
            <h4 className="text-xl font-bold">Error</h4>
            <p className="text-center">{error}</p>
          </>
        )}

        {events && events.map((event) => (
          <TimelineEvent key={event.title} event={event} />
        ))}
      </div>
    </div>
  );
}
