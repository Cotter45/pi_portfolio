import type { Session } from "@remix-run/node";

export async function validateCSRFToken(session: Session, csrf?: string) {
  if (!csrf) {
    throw new Error("Token not included.");
  }

  if (csrf !== session.get("csrf")) {
    throw new Error("Tokens do not match.");
  }
}