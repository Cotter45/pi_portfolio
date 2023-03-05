import { createContext, useContext } from 'react';


export type AuthenticityTokenProviderProps = {
  children: React.ReactNode;
  token: string;
};

let context = createContext<string | null>(null);

export function AuthenticityTokenProvider({
  children,
  token,
}: AuthenticityTokenProviderProps) {
  return (
    <context.Provider value={token}>
      {children}
    </context.Provider>
  );
}

export function useAuthenticityToken() {
  let token = useContext(context);
  if (!token) throw new Error("Missing AuthenticityTokenProvider.");
  return token;
}

export function AuthenticityToken() {
  let token = useAuthenticityToken();
  return <input type="hidden" value={token} name="csrf" />;
}
