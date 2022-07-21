import React from 'react';
import {Circles,Audio,BallTriangle,Hearts,ThreeDots,TailSpin,Puff,Oval,Rings,Grid} from "react-loader-spinner";

const Spinner = ({message}) => {
  return (
    <div className='flex flex-col justify-center items-center w-full h-full'>
      <BallTriangle
        color="#EB1D36"
        height={50}
        width={200}
        className="m-5"
      />

      <p className='text-lg text-center px-2'>{message}</p>
    </div>
  )
}

export default Spinner
