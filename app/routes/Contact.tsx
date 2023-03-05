import GithubLink from "~/components/links/Github";
import LinkedInLink from "~/components/links/LinkedIn";
import { AuthenticityToken } from "~/context/AuthenticityToken";
import PageContainer from "../components/containers/Page";

export default function Contact() {
  return (
    <PageContainer>
      <div className="mt-10 py-8 lg:py-16 px-4 mx-auto w-full max-w-screen-md">
        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">
          Contact Me
        </h2>
        <div className="flex items-center justify-center space-x-4 mt-4 mx:text=xl">
          <GithubLink />
          <LinkedInLink />
        </div>
        <form action="/api/contact" method="POST" className="w-full space-y-8">
          <AuthenticityToken />
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-white"
            >
              Your email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="name@place.com"
              required
            />
          </div>
          <div>
            <label
              htmlFor="subject"
              className="block mb-2 text-sm font-medium text-white"
            >
              Subject
            </label>
            <input
              type="text"
              id="subject"
              name="subject"
              className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
              placeholder="What's this about?"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="html"
              className="block mb-2 text-sm font-medium text-white"
            >
              Your message
            </label>
            <textarea
              id="html"
              name="html"
              rows={6}
              className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 whitespace-pre-wrap"
              placeholder="Leave a comment..."
            ></textarea>
          </div>
          <button
            type="submit"
            className="animate-text bg-gradient-to-r from-teal-600 via-teal-800 to-orange-400  font-semibold self-center border-2 border-orange-400 rounded px-6 py-1 hover:border-teal-800 transition-all duration-300 ease-in-out"
          >
            Send message
          </button>
        </form>
      </div>
    </PageContainer>
  );
}