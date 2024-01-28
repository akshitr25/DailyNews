import React from 'react'
import loading from './loading.gif'
const Spinner=()=>{ //function based component
    return (
      <div className="text-center bg-secondary">
        <img src={loading} alt="loading"/>
      </div>
    )
}
export default Spinner;