import { useNavigate } from 'react-router-dom'
import React, { useEffect, useState } from 'react'
import axios from "axios"

const Feed = () => {

  const [showModal, setShowModal] = useState(false)
  const [selectedId, setSelectedId] = useState(null)

  const [posts, setPosts] = useState([
    {
      _id:"1",
      image: "https://images.unsplash.com/photo-1501785888041-af3ef285b470",
      caption:"Beautiful scenery"
    }
  ])

  const navigate = useNavigate();

  useEffect(()=>{
    const token = localStorage.getItem("token");

    if(!token){
      navigate("/");

      return;
    }

    axios.get("https://web-app-4yko.onrender.com/posts")
    .then((res)=>{
      
      setPosts(res.data.posts)
    })
  },[])

  // Delete Function

  const handleDelete = async () => {
    
    try{
      await axios.delete(`https://web-app-4yko.onrender.com/delete-post/${selectedId}`);
      setPosts((prev) => prev.filter((p) => p._id !== selectedId));
      setShowModal(false)
    }catch (error){
      console.log(error);
    }
  };

  const handleLogout = () => {
  localStorage.removeItem("token");
  navigate("/");
};

  return (

    <section className='feed-section'>

    <button 
    onClick={handleLogout}
    className='logout-btn'>
        Logout
      </button>
      {
        posts.length > 0 ? (
          posts.map((post) => (
            <div key={post._id} className='post-card'>
              <img src={post.image} alt={post.caption} />
              <p className="caption">{post.caption}</p>

              <button 
              onClick={() => {
                setSelectedId(post._id);
              setShowModal(true);
              }}
              className='delete-btn'
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <h1>No Posts Available</h1>
        )
      }

      {showModal && (
        <div className='modal-overlay'>
          <div className='modal-box'>
            <h3>Are you sure?</h3>
            <p>You want to delete this post</p>

            <div className='modal-buttons'>
              <button
              className='cancel-btn'
              onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
              className='confirm-btn'
              onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Feed
