import { FunctionComponent, useState } from "react";
import { getUrl } from "../../api.service";
import { Button, Input } from "@headlessui/react";
import { T_ErrorBody, T_URL } from "../../types";
import { AxiosError } from "axios";

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

      <div
        className="justify-center grid grid-cols-2 gap-4 flex-wrap data-[visible=false]:scale-y-0 data-[visible=true]:scale-y-1 transform ease-in-out duration-300"
        data-visible={urlInfo ? true : false}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-red-500">
          Short id:
        </span>
        <span>{urlInfo?.short_url_id}</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-red-500">
          Original Url:
        </span>
        <span>{urlInfo?.original_url}</span>
      </div>

      <div
        className="justify-center grid grid-cols-2 gap-4 flex-wrap data-[visible=false]:scale-y-0 data-[visible=true]:scale-y-1 transform ease-in-out duration-300"
        data-visible={error ? true : false}
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-red-500">
          Error: {error}
        </span>
      </div>
    </div>
  );
};

export default GetUrlInfoSection;
