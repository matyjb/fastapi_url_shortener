import { FunctionComponent } from "react";
import "./index.css";
import CreateShortUrlSection from "./CreateShortURLSection";
import GetUrlInfoSection from "./GetUrlInfoSection";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  return (
    <div className="text-center text-3xl pt-24 pb-6 h-6 mx-auto max-w-xl grid gap-20 grid-cols-1">
      <CreateShortUrlSection />
      <GetUrlInfoSection/>
    </div>
  );
};

export default Home;
