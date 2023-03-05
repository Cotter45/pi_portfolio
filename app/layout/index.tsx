import { AnimatePresence } from "framer-motion";
import { Outlet } from "@remix-run/react";

import Stars from "../components/particles/Stars";
import Header from "./Header";


export default function Layout() {
  return (
    <>
    <AnimatePresence>
      <Header />
    </AnimatePresence>
    <AnimatePresence>
      <Outlet />
    </AnimatePresence>
    <Stars />
    </>
  )
}