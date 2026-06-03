
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Register() {

  const navigate = useNavigate();

  const [formData, setFormData] = useState({

    name: "",
    email: "",
    password: ""

  });

  const [successMessage, setSuccessMessage] = useState("");

  const [errorMessage, setErrorMessage] = useState("");


  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]: e.target.value

    });

  };


  const handleSubmit = async () => {

    setSuccessMessage("");
    setErrorMessage("");


    if (

      !formData.name ||
      !formData.email ||
      !formData.password

    ) {

      setErrorMessage("Please fill all fields");

      return;

    }


    try {

      const response = await fetch(

        "http://localhost:5000/auth/register",

        {

          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(formData)

        }

      );


      const data = await response.text();


      if (response.ok) {

        setSuccessMessage("Registered Successfully 🚀");


        setFormData({

          name: "",
          email: "",
          password: ""

        });


        setTimeout(() => {

          navigate("/login");

        }, 2000);

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


      {/* Register Card */}

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
          REGISTER
        </h1>


        {/* Name Input */}

        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
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


        {/* Success Message */}

        {
          successMessage && (

            <p className="
              text-green-400
              text-center
              mb-5
              font-semibold
            ">

              {successMessage}

            </p>

          )
        }


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


        {/* Register Button */}

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

          REGISTER

        </button>


        {/* Login Link */}

        <p className="
          text-gray-300
          text-center
          mt-6
        ">

          Already have an account?

          <span
            onClick={() => navigate("/login")}
            className="
              text-blue-400
              ml-2
              cursor-pointer
              hover:underline
            "
          >

            Login

          </span>

        </p>

      </div>

    </div>

  );
}

export default Register;

