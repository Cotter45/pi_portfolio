import PageContainer from "../components/containers/Page";
import Bio from "../components/bio/Bio";
import Skills from "../components/skills/Skills";
import Timeline from "../components/timeline/Timeline";
import GithubLink from "~/components/links/Github";
import LinkedInLink from "~/components/links/LinkedIn";

export default function About() {
  return (
    <PageContainer classes="py-4 gap-10 justify-start !items-start">
      <div className="self-center p-4 backdrop-blur-sm rounded-full mt-10">
        <img
          src="/sean_cotter.jpeg"
          alt="Sean Cotter"
          className="self-center w-32 h-32 rounded-full"
        />
        <div className="flex items-center justify-center space-x-4 mt-4 mx:text=xl">
          <GithubLink />
          <LinkedInLink />
        </div>
      </div>
      <Bio />
      <Timeline />
      <Skills />
    </PageContainer>
  );
}