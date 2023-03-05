import Skill from "../skills/Skill";

import type { TimelineEventType } from "./Timeline";

export default function TimelineEvent({ event }: { event: TimelineEventType }) {
  return (
    <div className="w-full flex flex-col gap-2 p-4 rounded backdrop-blur-sm">
      <div className="w-full flex flex-row justify-between">
        <h3 className="text-xl font-bold">{event.title}</h3>
        <p className="text-sm font-medium whitespace-nowrap">
          {new Date(event.startDate).toLocaleDateString()} -{" "}
          {event.endDate ? new Date(event.endDate).toLocaleDateString() : 'Current'}
        </p>
      </div>
      <h4 className="text-lg font-medium">{event.employer}</h4>
      <p className="text-sm font-medium">{event.description}</p>
      <div className="w-full flex flex-row flex-wrap">
        {event.skills.map((skill) => (
          <Skill key={skill} skill={skill} />
        ))}
      </div>
    </div>
  );
}