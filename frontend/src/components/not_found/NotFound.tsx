import { FunctionComponent } from "react";
import { useRouteError } from "react-router-dom";

interface NotFoundProps {}

const NotFound: FunctionComponent<NotFoundProps> = () => {
  const error: any = useRouteError();
  console.error(error);

  return (
    <div>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};

export default NotFound;