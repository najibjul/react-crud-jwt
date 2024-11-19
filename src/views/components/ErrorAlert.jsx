import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ErrorAlert = ({ message }) => {
  if (!message) return null;

  return (
    <>
      <div role="alert" className="alert alert-error">
        <FontAwesomeIcon icon={faExclamationCircle} />
        <span>{message}</span>
      </div>
    </>
  );
};

export default ErrorAlert;
