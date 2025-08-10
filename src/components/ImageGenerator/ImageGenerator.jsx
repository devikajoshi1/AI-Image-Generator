import { useRef, useState } from 'react';
import default_Image from "../Assets/default_Image.svg";
import "./ImageGenerator.css";
const ImageGenerator = () => {
    const [image_url , setImage_url] = useState("/");
    let inputRef = useRef(null);

    const[loading , setLoading] = useState(false);

    const imageGenerator = async() =>{
        if(inputRef.current.value === ""){
            return 0;
        }
        setLoading(true);
        const response = await fetch(
            "https://api.openai.com/v1/images/generations",
            {
                method:"POST",
                headers:{
                    "content-Type":"application/json",
                    Authorization:import.meta.env.VITE_OPENAI_API_KEY,
                    "User-Agent":"Chrome"
                },
                body:JSON.stringify({
                    prompt:`${inputRef.current.value}`,
                    n:1,
                    size:"500x500"
                }),
            }

        );
        let data = await response.json();
        let data_array = data.data;
        setImage_url(data_array[0].url);
        setLoading(false)

    }

  return (
    <div className='ai-image-generator'>
      <div className='header'>Ai Image <span>generator</span></div>
      <div className='img-loading'>
        <div className='image'>
            <img src={image_url === "/" ? default_Image : image_url}/>
        </div>
        <div className='loading'>
            <div className={loading ? "loading-bar-full" : "loading-bar"}>
                <div className={loading ? "loading-text":"display-none"}>
                    Loading....
                </div>
            </div>
        </div>
      </div>
      <div className='search-box'>
        <input type='text' ref={inputRef} className='search-input' placeholder='Describe what you want to see'/>
        <div className='generate-btn' onClick={()=>{imageGenerator()}}>Generate</div>
      </div>
    </div>
  )
}

export default ImageGenerator
