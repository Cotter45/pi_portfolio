import { motion } from "framer-motion";

import PageContainer from "../components/containers/Page";
import GithubLink from "../components/links/Github";
import LinkedInLink from "../components/links/LinkedIn";

export default function Index() {
  return (
    <PageContainer classes="!justify-start pt-[20vh] md:pt-0 md:!items-start md:!justify-center">
      <div className="relative w-[90%] flex flex-col justify-evenly items-center md:items-start md:pl-10 z-10">
        <h1 className="text-4xl md:text-5xl font-bold">Sean Cotter</h1>
        <p className="font-medium md:text-2xl">Full Stack Developer</p>
        <div className="flex items-center justify-center space-x-4 mt-4 mx:text=xl">
          <GithubLink />
          <LinkedInLink />
        </div>
        <p className="mt-4 text-center text-sm md:w-[40%] lg:w-[50%] md:text-left md:text-base">
          I'm a full stack software developer with a passion for building
          beautiful and functional web applications. I'm currently working as a
          software engineer at Nestle Nespresso SA.
        </p>
      </div>

      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 1 }}
        className="w-full max-w-[500px] overflow-hidden fixed bottom-0 right-0 flex items-end justify-end z-0"
      >
        <img
          className="max-h-full object-cover"
          src="/splash.png"
          alt="splash"
        />
      </motion.div>
    </PageContainer>
  );
}
