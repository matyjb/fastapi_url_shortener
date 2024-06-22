import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getUrl } from "../../api.service";

interface RedirectToUrlProps {}

const RedirectToUrl: FunctionComponent<RedirectToUrlProps> = () => {
  const params = useParams();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!params.shortLinkId) return;

    getUrl(params.shortLinkId).then((url) => {
      if (url && url.original_url) {
        window.location.replace(url.original_url);
      } else {
        setError("Url does not exist");
      }
    });
  }, [params.shortLinkId]);
  // make request to api and redirect to provided original url
  // if it doesnt exist, display 404 error

  return (
    <div className="text-center text-2xl m-6">
      {error ? (
        <div className="text-red-500">{error}</div>
      ) : (
        <div className="text-indigo-400">Redirecting...</div>
      )}
    </div>
  );
};

export default RedirectToUrl;
