import { FunctionComponent, useState } from "react";
import { getUrl } from "../../api.service";
import { Button, Input } from "@headlessui/react";
import { T_URL } from "../../types";

interface GetUrlInfoSectionProps {}

const GetUrlInfoSection: FunctionComponent<GetUrlInfoSectionProps> = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>();
  const [url, setUrl] = useState<string>("");
  const [urlInfo, setUrlInfo] = useState<T_URL>();

  const handleClick = () => {
    if (loading) return;

    setLoading(!loading);
    getUrl(url)
      .then((urlInfo) => {
        setLoading(false);
        if (urlInfo) {
          setUrlInfo(urlInfo);
          setError(null);
        }
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
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
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-red-500">Short id:</span>
        <span>{urlInfo?.short_url_id}</span>
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-500 to-red-500">Original Url:</span>
        <span>{urlInfo?.original_url}</span>
      </div>
    </div>
  );
};

export default GetUrlInfoSection;
