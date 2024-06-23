import { FunctionComponent, useState } from "react";
import { createShortUrl } from "../../api.service";
import { Button, Input } from "@headlessui/react";
import { T_ErrorBody } from "../../types";
import { AxiosError } from "axios";
import { ClipboardIcon } from "@heroicons/react/16/solid";

interface CreateShortUrlSectionProps {}

const CreateShortUrlSection: FunctionComponent<
  CreateShortUrlSectionProps
> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [url, setUrl] = useState<string>();
  const [shortUrl, setShortUrl] = useState<string>();

  const handleClick = () => {
    if (loading || !url) return;

    setLoading(!loading);
    createShortUrl(url)
      .then((res) => {
        setShortUrl(`${location.origin}/${res.data.short_url_id}`);
        setError(undefined);
      })
      .catch((err: AxiosError<T_ErrorBody>) => {
        setShortUrl(undefined);
        setError(err.response?.data.detail ?? err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className=" grid gap-4 grid-cols-1">
      <h2 className="text-3xl m-6">Just make it short</h2>
      <div className="flex flex-wrap justify-center gap-4">
        <Input
          className={"input"}
          placeholder="Enter your loooooong url"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button className="b-primary" onClick={handleClick} disabled={loading}>
          Shorten it
        </Button>
      </div>

      {shortUrl && (
        <div className="justify-center gap-4 flex-wrap flex items-center">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-red-500">
            {shortUrl}
          </span>
          <a
            className="social"
            onClick={() => navigator.clipboard.writeText(shortUrl)}
            href="#"
          >
            <ClipboardIcon
              fill="none"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            />
          </a>
        </div>
      )}

      {error && <span className="text-red-500">{error}</span>}
    </div>
  );
};

export default CreateShortUrlSection;
