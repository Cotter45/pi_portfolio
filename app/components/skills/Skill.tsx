export default function Skill({ skill }: { skill: string }) {
  return (
    <div className="p-1 text-sm font-medium hover:scale-110 cursor-default transition-all duration-300 ease-in-out">
      {skill}
    </div>
  );
}