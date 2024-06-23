import { FunctionComponent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { clickUrl } from "../../api.service";
import { AxiosError } from "axios";
import { T_ErrorBody } from "../../types";

interface RedirectToUrlProps {}

const RedirectToUrl: FunctionComponent<RedirectToUrlProps> = () => {
  const params = useParams();
  const [error, setError] = useState<string>();

  useEffect(() => {
    if (!params.shortLinkId) return;

    clickUrl(params.shortLinkId)
      .then((res) => {
        window.location.replace(res.data.original_url);
      })
      .catch((err: AxiosError<T_ErrorBody>) => {
        setError(err.response?.data.detail ?? err.message);
      });
  }, [params.shortLinkId]);

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
