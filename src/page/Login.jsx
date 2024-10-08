import { Button, Card, Input, Typography } from "@material-tailwind/react";
import toast from "react-hot-toast";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import useAuth from "../Hooks/useAuth";

const Login = () => {
  const { signIn, googleLogin, user, loading } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const onSubmit = async (data) => {
    try {
      signIn(data.email, data.password).then(() => {
        toast.success("Login successful");
        navigate("/");
        reset();
        console.log("login");
      });
    } catch (error) {
      console.error("Error during registration:", error);
      toast.error("Registration failed. Please try again later.");
    }
  };

  const handleGoogle = () => {
    googleLogin().then(() => {
      toast.success("Registration successful");
      navigate("/");
    });
  };

  useEffect(() => {
    if (user) {
      navigate(location.state ? location.state : "/");
    }
  }, [navigate, user, location.state]);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card color="transparent" shadow={false} className="p-8">
        <Typography variant="h4" color="primary" className="text-center">
          LogIn
        </Typography>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96 mx-auto"
        >
          <div className="mb-1 flex flex-col gap-6">
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Your Email
            </Typography>
            <Input
              size="lg"
              placeholder="name@mail.com"
              className="!border-t-blue-gray-200 focus:!border-primary"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-600">Email is required</span>
            )}
            <Typography variant="h6" color="blue-gray" className="-mb-3">
              Password
            </Typography>
            <Input
              type="password"
              size="lg"
              placeholder="********"
              className="!border-t-blue-gray-200 focus:!border-primary"
              labelProps={{
                className: "before:content-none after:content-none",
              }}
              {...register("password", {
                required: true,
                minLength: 6,
                maxLength: 20,
                pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
              })}
            />
            {errors.password?.type === "required" && (
              <p className="text-red-600">Password is required</p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600">Password must be 6 characters</p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-600">
                Password must be less than 20 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600">
                Password must have one Uppercase one lower case, one number and
                one special character.
              </p>
            )}
          </div>

          <Button
            disabled={loading}
            type="submit"
            className="mt-6 bg-primary"
            fullWidth
            variant="filled"
          >
            Sign Up
          </Button>
          <Typography color="gray" className="mt-4 text-center font-normal">
            New Hare !
            <Link
              to="/register"
              href="#"
              className="font-medium text-primary ml-2"
            >
              Register
            </Link>
          </Typography>
          <div className="flex justify-center">
            <h2>-----OR-----</h2>
          </div>
        </form>
        <div className="flex justify-center gap-2 ">
        <Button disabled={loading} onClick={handleGoogle} className="w-full flex items-center justify-center gap-2 mt-4 border border-gray-300 rounded-full py-2">
            
            <span>Sign in with Google</span>
          </Button>
        
        </div>
      </Card>
    </div>
  );
};

export default Login;
