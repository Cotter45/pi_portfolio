import { redirect } from "@remix-run/node";

import { commitSession, getSession } from "~/sessions";
import { validateCSRFToken } from "~/util/validateCSRF.server";

import type { ActionArgs, ActionFunction } from "@remix-run/node";

const authUrl = process.env.AUTH_URL;
const emailUrl = process.env.EMAIL_URL;
const app = process.env.APP;
const email = process.env.EMAIL;
const password = process.env.PASSWORD;

declare global {
  var __authToken: string;
}

let authToken: string = global.__authToken || "";

const getAuthToken = async () => {
  if (!authUrl || !emailUrl || !app || !email || !password) {
    throw new Error("Missing environment variables");
  }

  if (!authToken) {
    const response = await fetch(`${authUrl}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "AppName": app,
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();
    if (process.env.NODE_ENV === "production") {
      __authToken = data.token;
      authToken = __authToken;
    } else {
      if (!global.__authToken) {
        global.__authToken = data.token;
      }
      authToken = global.__authToken;
    }
  }

  setInterval(refreshAuthToken, 3500000);
  return authToken;
}

const refreshAuthToken = async () => {
  if (!authUrl || !emailUrl || !app || !email || !password) {
    throw new Error("Missing environment variables");
  }

  if (!authToken) {
    const response = await fetch(`${authUrl}/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "AppName": app,
        "Authorization": `Bearer: ${authToken}`,
      },
    });

    const data = await response.json();
    if (process.env.NODE_ENV === "production") {
      __authToken = data.token;
    } else {
      if (!global.__authToken) {
        global.__authToken = data.token;
      }
      authToken = global.__authToken;
    }
  }

  return authToken;
}

export const action: ActionFunction = async ({ request }: ActionArgs) => {
  let session = await getSession(request.headers.get("Cookie"));
  const form = await request.formData();

  const csrf = form.get("csrf") as string || "";

  try {
    await validateCSRFToken(session, csrf);
  } catch (error: any) {
    console.log('Invalid CSRF token: ', error.message);
    session.flash("error", error.message);
    return redirect("/contact", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }

  if (!authUrl || !emailUrl || !app || !email || !password) {
    throw new Error("Missing environment variables");
  }

  const to = form.get("email") as string || "";
  const subject = form.get("subject") as string || "";
  let html = form.get("html") as string || ""; 
  html = html.replace(/\n/g, "<br>");
  html = html.replace(/\r/g, "<br>");
  html = html.replace(/%0A/g, "<br>");

  try {
    if (!authToken && !global.__authToken) {
      authToken = await getAuthToken();
    }
    
    const response = await fetch(emailUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "AppName": app,
        "Authorization": `Bearer: ${authToken}`,
      },
      body: JSON.stringify({
        to,
        subject,
        html,
      }),
    });

    const data = await response.json();
    
    if (data.message && data.message === "Success") {
      return redirect("/contact-success", {
        headers: { "Set-Cookie": await commitSession(session) },
      });
    } else {
      console.log('Error sending email: ', data);
      session.flash("error", "Something went wrong, please try again.");
      return redirect("/contact", {
        headers: { "Set-Cookie": await commitSession(session) },
      });
    }

  } catch (error: any) {
    console.log('Uncaught exception: ', error.message);
    session.flash("error", "Something went wrong, please try again.");
    return redirect("/contact", {
      headers: { "Set-Cookie": await commitSession(session) },
    });
  }
}