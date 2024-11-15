import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const SuccessAlert = ({message}) => {
    
    if(!message) return null

    return(
        <>
        <div className="p-3 my-2 bg-green-700 rounded">
            <p className="text-white">
            <FontAwesomeIcon icon={faCheckCircle} /> {message}
            </p>
        </div>
        </>
        
    )
}

export default SuccessAlert