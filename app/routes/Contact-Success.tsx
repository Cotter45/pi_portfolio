import { Link } from "@remix-run/react";
import PageContainer from "~/components/containers/Page";

export default function ContactSuccess() {
  return (
    <PageContainer classes="!justify-center">
      <div className="py-8 lg:py-16 px-4 mx-auto w-full max-w-screen-md flex flex-col place-content-center">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Thank you!
        </h2>
        <p className="text-center text-gray-500 dark:text-gray-400">
          I'll get back to you as soon as I can.
        </p>
        <Link
          to="/contact"
          className="mt-10 animate-text bg-gradient-to-r from-teal-600 via-teal-800 to-orange-400  font-semibold self-center border-2 border-orange-400 rounded px-6 py-1 hover:border-teal-800 transition-all duration-300 ease-in-out"
        >
          Send Another Message
        </Link>
      </div>
    </PageContainer>
  );
}