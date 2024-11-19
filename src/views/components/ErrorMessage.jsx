import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <>
        <p className="text-error">
            <FontAwesomeIcon className="text-red-800" icon={faExclamationCircle} />{" "}
            {message}
        </p>
    </>
  );
};

export default ErrorMessage;
