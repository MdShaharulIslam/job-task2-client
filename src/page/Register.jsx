import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import toast from "react-hot-toast";
import axios from "axios";
import { Link, useNavigate } from 'react-router-dom';
import BeatLoader from "react-spinners/BeatLoader";
import useAuth from "../Hooks/useAuth";

export function Register() {
  const [imageUrl, setImageUrl] = useState(null);
  const [img, setImg] = useState(null);
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const { createUser, profileUpdate, googleLogin, setUser, loading, setLoading } = useAuth();
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("image", img);

      const { data: imgData } = await axios.post(`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMG_API}`, formData);
      createUser(data.email, data.password)
        .then((res) => {
          profileUpdate(data.name, imgData.data.display_url)
            .then(() => {
              toast.success("Registration successful");
              setUser(res.user);
              navigate('/');
              reset();
            })
        }).catch(error => {
          setErr(error.message);
          setLoading(false);
        });
    } catch (error) {
      console.error('Error during registration:', error);
      toast.error("Registration failed. Please try again later.");
    }
  };

  const handleImg = (event) => {
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setImageUrl(imageUrl);
    setImg(file);
  };

  const handleGoogle = () => {
    googleLogin()
      .then(() => {
        toast.success("Registration successful");
        navigate('/');
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Card color="transparent" shadow={true} className="p-8 max-w-md w-full">
        <Typography variant="h4" color="blue-gray" className="text-center mb-4">
          Register
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col items-center mb-4">
            <label htmlFor="fileInput" className="flex items-center justify-center w-24 h-24 bg-gray-200 rounded-full cursor-pointer relative overflow-hidden">
              {imageUrl ? (
                <img src={imageUrl} alt="Uploaded" className="w-full h-full object-cover rounded-full" />
              ) : (
                <img src="https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg" alt="Default" className="w-full h-full object-cover rounded-full" />
              )}
              <input id="fileInput" type="file" onChange={handleImg} className="absolute inset-0 opacity-0 cursor-pointer" />
            </label>
            <Typography color="gray" className="text-sm">Upload your profile picture</Typography>
          </div>

          <div className="space-y-2">
            <Typography variant="h6" color="blue-gray">
              Your Name
            </Typography>
            <Input {...register("name", { required: true })} size="lg" placeholder="Your Name" className="!border-blue-gray-200 focus:!border-primary" />
            {errors.name && <span className="text-red-600 text-sm">Name is required</span>}
            
            <Typography variant="h6" color="blue-gray">
              Your Email
            </Typography>
            <Input {...register("email", { required: true })} size="lg" placeholder="name@mail.com" className="!border-blue-gray-200 focus:!border-primary" />
            {errors.email && <span className="text-red-600 text-sm">Email is required</span>}
            
            <Typography variant="h6" color="blue-gray">
              Password
            </Typography>
            <Input type="password" {...register("password", { required: true, minLength: 6, maxLength: 20, pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/ })} size="lg" placeholder="********" className="!border-blue-gray-200 focus:!border-primary" />
            {errors.password?.type === "required" && <p className="text-red-600 text-sm">Password is required</p>}
            {errors.password?.type === "minLength" && <p className="text-red-600 text-sm">Password must be at least 6 characters</p>}
            {errors.password?.type === "maxLength" && <p className="text-red-600 text-sm">Password must be less than 20 characters</p>}
            {errors.password?.type === "pattern" && <p className="text-red-600 text-sm">Password must include uppercase, lowercase, number, and special character</p>}
          </div>

          {err && <p className="text-red-600 text-sm">{err}</p>}

          <Button disabled={loading} type="submit" className="w-full mt-4 bg-primary" fullWidth>
            {loading ? <BeatLoader size={6} color="#FFFFFF" /> : 'Sign Up'}
          </Button>

          <Typography color="gray" className="mt-4 text-center text-sm">
            Already have an account? <Link to='/login' className="font-medium text-primary">Log In</Link>
          </Typography>

          <div className="flex items-center justify-center mt-4">
            <span className="text-gray-600">OR</span>
          </div>

          <Button disabled={loading} onClick={handleGoogle} className="w-full flex items-center justify-center gap-2 mt-4 border border-gray-300 rounded-full py-2">
            
            <span>Sign in with Google</span>
          </Button>
        </form>
      </Card>
    </div>
  );
}
