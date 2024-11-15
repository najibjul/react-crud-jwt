import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const ErrorAlert = ({ message }) => {
  if (!message) return null;

  return (
    <>
      <div className="p-3 my-2 bg-red-700 rounded">
        <p className="text-white">
          <FontAwesomeIcon icon={faExclamationCircle} /> {message}
        </p>
      </div>
    </>
  );
};

export default ErrorAlert;
