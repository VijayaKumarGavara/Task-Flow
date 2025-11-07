import { useRouteError } from "react-router"

const ErrorPage = () => {
  const error=useRouteError();
  return (
    <>
      <h2>Oops.. Something went wrong. </h2>
      <h3>{error.status} - {error.statusText}</h3>
    </>
  )
}

export default ErrorPage