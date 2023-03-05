import { useEffect, useState } from "react";

export default function Bio() {
  const [bio, setBio] = useState<string[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  const getBio = async () => {
    const res = await fetch("/api/bio");
    const data = await res.json();
    if (data.error) {
      setError(data.error);
    } else {
      setBio(Object.values(data));
    }
  };

  useEffect(() => {
    getBio();
  }, []);

  return (
    <div className="w-full flex flex-col items-center gap-6">
      <div className="w-full">
        <h2 className="w-full text-3xl font-bold pl-10">My Bio</h2>
      </div>

      <div className="w-[82%] flex flex-col gap-2">
        {error && (
          <>
            <h4 className="text-xl font-bold">Error</h4>
            <p className="text-center">{error}</p>
          </>
        )}

        {bio && bio.map((paragraph, index) => (
          <p className='backdrop-blur-sm p-2 rounded' key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
