import React from 'react'

function Card({title , value }) {
  return (
      <div className="col-lg-3 col-md-6 col-sm-6 col-12 ">
          <div className={`card  p-3`}>
            <div className="card-wrap">
              <div className="card-header text-center">
                <p>
                  <strong>{title}</strong>
                </p>
              </div>
              <div className="text-5xl font-bold flex justify-center items-center Text">
                <h1> {value} </h1>
              </div>
            </div>
          </div>
        </div>
  )
}

export default Card
