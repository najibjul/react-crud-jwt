import React from "react"

const SuccessAlert = ({message}) => {
    
    if(!message) return null

    return(
        <div className="alert alert-success mt-3">
            {message}
        </div>
    )
}

export default SuccessAlert