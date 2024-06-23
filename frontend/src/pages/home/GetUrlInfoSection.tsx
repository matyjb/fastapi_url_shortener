import { FunctionComponent, useState } from "react";
import { getUrl } from "../../api.service";
import { Button, Input } from "@headlessui/react";
import { T_ErrorBody, T_URL } from "../../types";
import { AxiosError } from "axios";
import { CalendarIcon, CursorArrowRaysIcon, LinkIcon } from "@heroicons/react/16/solid";

interface GetUrlInfoSectionProps {}

const GetUrlInfoSection: FunctionComponent<GetUrlInfoSectionProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [url, setUrl] = useState<string>("");
  const [urlInfo, setUrlInfo] = useState<T_URL>();

  const handleClick = () => {
    if (loading) return;

    setLoading(!loading);
    getUrl(url.slice(-6))
      .then((res) => {
        setUrlInfo(res.data);
        setError(undefined);
      })
      .catch((err: AxiosError<T_ErrorBody>) => {
        setUrlInfo(undefined);
        setError(err.response?.data.detail ?? err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className=" grid gap-4 grid-cols-1">
      <div className="text-xl">...or get information about the url:</div>
      <div className="flex flex-wrap justify-center gap-4">
        <Input
          className={"input"}
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder={`${location.origin}/XXXXXX`}
        />
        <Button className="b-primary" onClick={handleClick}>
          Get info
        </Button>
      </div>

      {urlInfo && <div
        className="justify-center grid grid-cols-1 gap-4 flex-wrap"
      >
        <div className="w-fit flex flex-wrap items-center gap-4 justify-center">
          <CursorArrowRaysIcon className="w-10 h-10" />
          <div className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-red-500">
            {urlInfo?.clicks}
          </div>
        </div>
        <div className="w-fit flex flex-wrap items-center gap-4 justify-center">
          <LinkIcon className="w-10 h-10" />
          <div className="overflow-ellipsis bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-red-500">
            {urlInfo?.original_url}
          </div>
        </div>
        <div className="w-fit flex flex-wrap items-center gap-4 justify-center">
          <CalendarIcon className="w-10 h-10" />
          <div className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-red-500">
            {urlInfo && (new Date(urlInfo?.expiration_date)).toLocaleString()}
          </div>
        </div>
      </div>}

      {error && <div
        className="justify-center"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-red-500">
          Error: {error}
        </span>
      </div>}
    </div>
  );
};

export default GetUrlInfoSection;
