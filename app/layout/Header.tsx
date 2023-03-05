import { useEffect, useState } from "react";
import { Link, NavLink } from "@remix-run/react"
import { AnimatePresence, motion } from "framer-motion"

import type { Variants } from "framer-motion"

const itemVariants: Variants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
      duration: 0.3,
    },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.4 } },
};

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const main = document.querySelector("main");
    const handleClose = () => {
      setIsOpen(false);
    };

    if (main) {
      main.addEventListener("click", handleClose);
    }

    return () => {
      if (main) {
        main.removeEventListener("click", handleClose);
      }
    };
  }, [isOpen]);

  return (
    <motion.nav
      initial={{ y: -100}}
      animate={{ y: 0 }}
      exit={{ y: -100 }}
      transition={{ duration: 1 }}
      className="sticky -top-20 w-full h-16 max-h-16 flex flex-row justify-between items-end px-4 pb-2 border-b border-neutral-700 z-20"
    >
      <Link
        to="/"
        className="animate-text bg-gradient-to-r from-teal-400 via-teal-600 to-orange-300 bg-clip-text text-transparent text-4xl font-black self-center"
      >
        {"<Cotter />"}
      </Link>

      <button
        type="button"
        name="Navigation Menu Toggle"
        aria-label="Navigation Menu Toggle"
        onClick={() => setIsOpen(!isOpen)}
        className="cursor-pointer bg-transparent z-10"
      >
        <div className="relative flex items-center justify-center rounded-full w-12 h-12 transform transition-all ring-0 ring-gray-300 hover:ring-4 ring-opacity-30 duration-200 shadow-md bg-transparent">
          <div
            className={`${
              isOpen ? "-rotate-[45deg] " : ""
            } flex flex-col justify-between w-1/2 h-[20px] transform transition-all duration-300 origin-center`}
          >
            <div
              className={`${
                isOpen ? "-rotate-90 -translate-y-[3px] " : ""
              } bg-white h-[1px] w-1/2 rounded transform transition-all duration-300 origin-right delay-75`}
            ></div>
            <div className="bg-white h-[1px] rounded"></div>
            <div
              className={`${
                isOpen ? "-rotate-90 translate-y-[3px] h-[1px] " : ""
              } bg-white h-[1px] w-1/2 rounded self-end transform transition-all duration-300 origin-left delay-75`}
            ></div>
          </div>
        </div>
      </button>

      <AnimatePresence>
        <motion.ul
          animate={isOpen ? "open" : "closed"}
          variants={{
            open: {
              clipPath: "inset(0% 0% 0% 0%)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.7,
                delayChildren: 0.25,
                staggerChildren: 0.1,
              },
            },
            closed: {
              clipPath: "inset(10% 50% 90% 50%)",
              transition: {
                type: "spring",
                bounce: 0,
                duration: 0.3,
              },
            },
          }}
          className="absolute w-full top-16 right-0 px-12 py-4 flex justify-evenly lg:!justify-end lg:gap-4 items-center text-white z-20"
        >
          {isOpen && (
            <>
              <motion.li variants={itemVariants}>
                <NavLink
                  className="animate-text bg-gradient-to-r from-teal-600 via-teal-800 to-orange-400  font-semibold self-center border-2 border-orange-400 rounded px-6 py-1 hover:border-teal-800 transition-all duration-300 ease-in-out"
                  onClick={() => setIsOpen(false)}
                  to="/"
                >
                  Home
                </NavLink>
              </motion.li>
              <motion.li variants={itemVariants}>
                <NavLink
                  className="animate-text bg-gradient-to-r from-teal-600 via-teal-800 to-orange-400  font-semibold self-center border-2 border-orange-400 rounded px-6 py-1 hover:border-teal-800 transition-all duration-300 ease-in-out"
                  onClick={() => setIsOpen(false)}
                  to="/about"
                >
                  About
                </NavLink>
              </motion.li>
              <motion.li variants={itemVariants}>
                <NavLink
                  className="animate-text bg-gradient-to-r from-teal-600 via-teal-800 to-orange-400  font-semibold self-center border-2 border-orange-400 rounded px-6 py-1 hover:border-teal-800 transition-all duration-300 ease-in-out"
                  onClick={() => setIsOpen(false)}
                  to="/contact"
                >
                  Contact
                </NavLink>
              </motion.li>
            </>
          )}
        </motion.ul>
      </AnimatePresence>
    </motion.nav>
  );
}