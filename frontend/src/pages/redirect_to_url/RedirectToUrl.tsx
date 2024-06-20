import { FunctionComponent, useEffect } from "react";
import { useParams } from "react-router-dom";

interface RedirectToUrlProps {}

const RedirectToUrl: FunctionComponent<RedirectToUrlProps> = () => {
  const params = useParams();

  useEffect(() => {
    console.log(params);
  });
  // make request to api and redirect to provided original url
  // if it doesnt exist, display 404 error

  return <>{params.linkId}</>;
};

export default RedirectToUrl;
