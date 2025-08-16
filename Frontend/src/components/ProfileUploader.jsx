import axios from "axios";
import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthProvider";
import { useLoading } from "../context/LoadingProvider";
import Loading from "./Loading";

function ProfileUploader() {
  const [authUser, setAuthUser] = useAuth();
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(authUser.user.image);
  const [newName, setNewName] = useState(authUser.user.fullname);
  const [bio, setBio] = useState(authUser.user.bio);
  const navigate = useNavigate();
  const[isLoading, setIsLoading] = useLoading();
  // setIsLoading(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file)); // Show local preview
  };

  const handleUpload = async (e) => {
    setIsLoading(true);
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("newName", newName);
    formData.append("bio", bio);
    
    try {
      const res = await axios.post("https://chatapp-if9x.onrender.com/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.url) {
        setPreviewUrl(res.data.url); // Use Cloudinary URL
        authUser.user.image=res.data.url;
        console.log(res.data.url);
      }
      await navigate('/');
      authUser.user.fullname = newName;
      authUser.user.bio=bio;
      setAuthUser(authUser);
      setIsLoading(false);
      
    } catch (error) {
      console.error("Upload failed:", error);
      await navigate('/');
      setIsLoading(false);
    }
    
  };

  return (
      <>
      {
        isLoading===true ? <Loading /> : <div className='min-h-screen bg-cover bg-no-repeat flex items-center justify-center' >
      <div className=' w-5/6 max-w-2xl backdrop-blur-2xl text-gray-300 border-2 border-gray-600 flex flex-items-center justify-between max-sm:flex-col-reverse rounded-lg overflow-hidden' >
        <form onSubmit={handleUpload} action="" className='flex flex-col gap-5 p-10 flex-1' >
          <h3 className='text-lg' >Profile Details</h3>
          <label htmlFor="avatar" className='flex items-center gap-3 cursor-pointer bg-transparent' >
            <input onChange={(e) => {
              setImage(e.target.files[0])
            }} type="file" id='avatar' accept='.png, .jpg, .jpeg' hidden  />
            <img className={`w-12 h-12 bg-transparent rounded-full`} src={image ? URL.createObjectURL(image) : (previewUrl ? previewUrl :"https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=") } alt="" />
            Upload Profile Pic
          </label>
          <input onChange={(e) => {
            setNewName(e.target.value);
          }} value={newName} type="text" required placeholder='Your Full Name' className='p-2 border  bg-transparent border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500'/>
          <textarea value={bio}  onChange={(e) => setBio(e.target.value)} required placeholder='Write Profile Bio' className='p-2 border  bg-transparent border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-violet-500' rows={4} ></textarea>
          <button type='submit' className='bg-gradient-to-r from-purple-400 to-violet-600 text-white p-2 rounded-full text-lg cursor-pointer' >Save</button>
        </form>
        <div className="flex justify-center items-center" > 
          <img className='max-w-44 max-h-44 aspect-square rounded-full mx-10 max-sm:mt-10' src={image ? URL.createObjectURL(image) : (previewUrl ? previewUrl :"https://media.istockphoto.com/id/1300845620/vector/user-icon-flat-isolated-on-white-background-user-symbol-vector-illustration.jpg?s=612x612&w=0&k=20&c=yBeyba0hUkh14_jgv1OKqIH0CCSWU_4ckRkAoy2p73o=") } alt="" />
        </div>
        
      </div>
    </div>
      }
      </>
      
  );
}

export default ProfileUploader;
