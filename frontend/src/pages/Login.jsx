import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    email: "",
    password: ""

  });

  const [errorMessage, setErrorMessage] = useState("");


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };


  const handleSubmit = async () => {

    setErrorMessage("");


    if (

      !formData.email ||
      !formData.password

    ) {

      setErrorMessage("Please fill all fields");

      return;

    }


    try {

      const response = await fetch(

        "http://localhost:5000/auth/login",

        {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)

        }

      );


     const data = await response.json();


      if (response.ok) {
        localStorage.setItem("token", data.token);
        navigate("/dashboard");

      }

      else {

        setErrorMessage(data);

      }

    }

    catch (error) {

      console.log(error);

      setErrorMessage("Something went wrong");

    }

  };


  return (

    <div className="
      min-h-screen
      bg-black
      flex
      justify-center
      items-center
      relative
      overflow-hidden
    ">

      {/* Background Glow */}

      <div className="
        absolute
        w-[500px]
        h-[500px]
        bg-purple-500/30
        blur-3xl
        rounded-full
        top-[-100px]
        right-[-100px]
      "></div>


      <div className="
        absolute
        w-[400px]
        h-[400px]
        bg-blue-500/20
        blur-3xl
        rounded-full
        bottom-[-100px]
        left-[-100px]
      "></div>


      {/* Login Card */}

      <div
        className="
          relative
          z-10
          w-[420px]
          p-10
          rounded-[40px]
          bg-white/10
          backdrop-blur-xl
          border
          border-white/20
          shadow-2xl
        "
      >

        <h1 className="
          text-white
          text-5xl
          font-bold
          text-center
          mb-10
        ">
          LOGIN
        </h1>


        {/* Email Input */}

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="
            w-full
            mb-5
            p-4
            rounded-2xl
            bg-white/10
            border
            border-white/20
            text-white
            placeholder-gray-300
            outline-none
            focus:border-blue-400
          "
        />


        {/* Password Input */}

        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="
            w-full
            mb-8
            p-4
            rounded-2xl
            bg-white/10
            border
            border-white/20
            text-white
            placeholder-gray-300
            outline-none
            focus:border-blue-400
          "
        />


        {/* Error Message */}

        {
          errorMessage && (

            <p className="
              text-red-400
              text-center
              mb-5
              font-semibold
            ">

              {errorMessage}

            </p>

          )
        }


        {/* Login Button */}

        <button
          onClick={handleSubmit}
          className="
            w-full
            py-4
            rounded-2xl
            bg-gradient-to-r
            from-blue-500
            to-purple-500
            hover:scale-105
            transition
            text-white
            font-bold
            text-lg
            shadow-lg
          "
        >

          LOGIN

        </button>


        {/* Register Link */}

        <p className="
          text-gray-300
          text-center
          mt-6
        ">

          Don't have an account?

          <span
            onClick={() => navigate("/register")}
            className="
              text-blue-400
              ml-2
              cursor-pointer
              hover:underline
            "
          >

            Register

          </span>

        </p>

      </div>

    </div>

  );
}

export default Login;

