import React from 'react'
import { useNavigate } from 'react-router-dom'; 

const Failure = () => {
    const navigate = useNavigate()
    return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
                <div className="alert alert-danger text-center">
                    <h4 className="alert-heading">Oops, something went wrong!</h4>
                </div>
                <a href='/'>Back to Home</a>
            </div>
          </div>
        </div>
      );
}

export default Failure
