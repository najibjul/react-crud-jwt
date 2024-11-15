import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ErrorMessage = ({ message }) => {
  if (!message) return null;

  return (
    <>
        <p className="text-red-500">
            <FontAwesomeIcon icon={faExclamationCircle} />{" "}
            {message}
        </p>
    </>
  );
};

export default ErrorMessage;
