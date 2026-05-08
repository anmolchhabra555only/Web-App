import React from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const CreatePost = () => {

  const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault()

    const formData = new FormData(e.target)

    try{  
    const res = await axios.post("https://web-app-4yko.onrender.com/create-post", formData);
    
    console.log(res.data);

      navigate("/feed")

    }
    catch(err) {
      console.log(err);
      alert("Error Creatig Post")
    }
  };

  return (
    <section className='create-post-section'>
      <div className='create-card'>
      <h1>Create Post</h1>

      <form onSubmit={handleSubmit}>
      <input type="file" name="image" accept="image/*" required />
        
        <input 
        type="text" 
        name="caption" 
        placeholder='Enter Caption'
        required 
        />
        <button type='submit' >Submit</button>

      </form>
    </div>
  </section>
  )
}

export default CreatePost
