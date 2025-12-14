import React from 'react'
import axios from 'axios'

function Test() {

  const responce = async () =>{
    const imagedata = axios.get("url")

    console.log(imagedata)


  }
  return (
    <div className="text-center p-3">
      <img 
        src="img.jpg" 
        alt="image" 
        className="img-fluid rounded" 
        style={{ maxHeight: "80vh", objectFit: "contain" }}
      />
      <div className="mt-3">my image</div>
    </div>
  )
}

export default Test
