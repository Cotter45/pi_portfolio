import { createCookieSessionStorage } from "@remix-run/node";

type SessionData = {
  csrf: string;
};

type SessionFlashData = {
  error: string;
};

const { getSession, commitSession, destroySession } =
  createCookieSessionStorage<SessionData, SessionFlashData>(
    {
      cookie: {
        name: "__session",
        httpOnly: true,
        maxAge: 60,
        path: "/",
        sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",
        secrets: [process.env.SESSION_SECRET || ""],
        secure: false,
      },
    }
  );

export { getSession, commitSession, destroySession };