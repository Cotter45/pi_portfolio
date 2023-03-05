import { useEffect, useState } from "react";

import Skill from "./Skill";

interface ISkills {
  [key: string]: string[];
}

export default function Skills() {
  const [skills, setSkills] = useState<ISkills | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getSkills = async () => {
    const res = await fetch("/api/skills");
    const data = await res.json();
    
    if (data.error) {
      setError(data.error);
    } else {
      setSkills(data);
    }

  };
  
  useEffect(() => {
      getSkills();
  }, []);

  return (
    <div
      className="w-full flex flex-col items-center gap-6 pb-4"
    >
      <div className="w-full">
        <h2 className="w-full text-3xl font-bold pl-10">My Skills</h2>
      </div>

      {error && (
        <div className="w-[80%] flex flex-col items-center gap-4">
          <h4 className="text-xl font-bold">Error</h4>
          <p className="text-center">{error}</p>
        </div>
      )}

      {skills && (
        <div className="w-[82%] flex flex-col gap-4">
          <h4 className="text-xl font-bold">Languages</h4>
          <div className="flex flex-wrap gap-2 backdrop-blur-sm p-2 rounded">
            {skills?.languages.map((skill) => (
              <Skill key={skill} skill={skill} />
            ))}
          </div>

          <h4 className="text-xl font-bold">Frameworks</h4>
          <div className="flex flex-wrap gap-2 backdrop-blur-sm p-2 rounded">
            {skills?.frameworks.map((skill) => (
              <Skill key={skill} skill={skill} />
            ))}
          </div>

          <h4 className="text-xl font-bold">Databases</h4>
          <div className="flex flex-wrap gap-2 backdrop-blur-sm p-2 rounded">
            {skills?.databases.map((skill) => (
              <Skill key={skill} skill={skill} />
            ))}
          </div>

          <h4 className="text-xl font-bold">Other</h4>
          <div className="flex flex-wrap gap-2 backdrop-blur-sm p-2 rounded">
            {skills?.other.map((skill) => (
              <Skill key={skill} skill={skill} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}