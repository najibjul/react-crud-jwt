import { faCheckCircle } from "@fortawesome/free-solid-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const SuccessAlert = ({message}) => {
    
    if(!message) return null

    return(
        <>
            <div role="alert" className="alert alert-success">
                <FontAwesomeIcon icon={faCheckCircle} />
                <span>{message}</span>
            </div>
        </>
        
    )
}

export default SuccessAlert