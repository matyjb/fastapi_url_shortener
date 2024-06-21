import { Button, Input } from "@headlessui/react";
import { FunctionComponent, useState } from "react";
import "./index.css";
import { createShortUrl } from "../../api.service";

interface HomeProps {}

const Home: FunctionComponent<HomeProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [url, setUrl] = useState<string>("");
  const [shortUrl, setShortUrl] = useState<string>("");

  const handleClick = () => {
    if (loading) return;

    setLoading(!loading);
    createShortUrl(url)
      .then((shortUrl) => {
        setLoading(false);
        if (shortUrl) {
          setShortUrl(shortUrl);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  };

  return (
    <div className="text-center text-3xl pt-24 pb-6 h-6 mx-auto max-w-xl grid gap-4 grid-cols-1">
      <h2 className="text-3xl m-6">Just make it short</h2>
      {/* text box */}
      <div className="flex justify-center gap-4">
        <Input
          className={"input"}
          placeholder="Enter URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button className="b-primary" onClick={handleClick} disabled={loading}>
          Shorten it
        </Button>
      </div>

      {shortUrl && (
        <div className="flex justify-center gap-4">
          <span className="flex items-center no-underline text-2xl">
            Short URL: {shortUrl}
          </span>
          <a
            className="social p-2"
            onClick={() => navigator.clipboard.writeText(shortUrl)}
            href="#"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
              />
            </svg>
          </a>
        </div>
      )}

      {error && <span className="text-red-500">{error.message}</span>}
    </div>
  );
};

export default Home;