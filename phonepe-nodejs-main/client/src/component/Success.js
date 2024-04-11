import React from 'react'

const Success = () => {
    return (
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-6 text-center">
                <div className="alert alert-success text-center">
                    <h4 className="alert-heading">Payment Successfull</h4>
                </div>
                <a href='/'>Back to Home</a>
            </div>
          </div>
        </div>
      );
}

export default Success
