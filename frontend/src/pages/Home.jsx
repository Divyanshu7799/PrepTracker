
import { Link } from "react-router-dom";

function Home() {

  return (

    <div className="
      min-h-screen
      bg-[#0b1120]
      text-white
      overflow-hidden
      relative
    ">

      {/* Glow Effects */}

      <div className="
        absolute
        top-[-120px]
        right-[-120px]
        w-[350px]
        h-[350px]
        bg-blue-500/20
        blur-3xl
        rounded-full
      "></div>


      <div className="
        absolute
        bottom-[-120px]
        left-[-120px]
        w-[350px]
        h-[350px]
        bg-cyan-400/10
        blur-3xl
        rounded-full
      "></div>


      {/* Navbar */}

      <nav className="
        relative
        z-10
        flex
        justify-between
        items-center
        px-10
        py-6
      ">

        {/* Logo */}

        <h1 className="
          text-3xl
          font-extrabold
          bg-gradient-to-r
          from-blue-400
          to-cyan-300
          text-transparent
          bg-clip-text
        ">

          PrepTracker

        </h1>


        {/* Buttons */}

        <div className="flex gap-4">

          <Link
            to="/login"
            className="
              px-6
              py-3
              rounded-2xl
              bg-white/5
              border
              border-white/10
              hover:bg-white/10
              transition
            "
          >

            Login

          </Link>


          <Link
            to="/register"
            className="
              px-6
              py-3
              rounded-2xl
              bg-gradient-to-r
              from-blue-500
              to-cyan-400
              hover:scale-105
              transition-all
              duration-300
              font-semibold
              shadow-lg
            "
          >

            Get Started

          </Link>

        </div>

      </nav>


      {/* Hero Section */}

      <section className="
        relative
        z-10
        flex
        flex-col
        items-center
        justify-center
        text-center
        px-6
        pt-24
      ">

        {/* Badge */}

        <div className="
          px-5
          py-2
          rounded-full
          bg-blue-500/10
          border
          border-blue-400/20
          text-blue-300
          text-sm
          font-medium
          mb-8
        ">

          🚀 Smart Coding Progress Tracker

        </div>


        {/* Main Heading */}

        <h1 className="
          text-5xl
          md:text-7xl
          font-extrabold
          leading-tight
          max-w-5xl
          mb-8
        ">

          Build Your

          <span className="
            bg-gradient-to-r
            from-blue-400
            to-cyan-300
            text-transparent
            bg-clip-text
          ">

            {" "}Coding Momentum

          </span>

        </h1>


        {/* Description */}

        <p className="
          text-gray-400
          text-lg
          md:text-xl
          max-w-3xl
          leading-relaxed
          mb-12
        ">

          Track daily coding goals, monitor momentum,
          maintain streaks, and visualize your
          placement preparation journey with a
          futuristic productivity dashboard.

        </p>


        {/* CTA Buttons */}

        <div className="
          flex
          flex-col
          sm:flex-row
          gap-5
          mb-20
        ">

        <Link
  to={
    localStorage.getItem("token")
      ? "/dashboard"
      : "/register"
  }

            className="
              px-8
              py-4
              rounded-2xl
              bg-gradient-to-r
              from-blue-500
              to-cyan-400
              hover:scale-105
              transition-all
              duration-300
              font-semibold
              shadow-2xl
            "
          >

            Start Tracking

          </Link>


           <Link
  to={
    localStorage.getItem("token")
      ? "/dashboard"
      : "/login"
  }

            className="
              px-8
              py-4
              rounded-2xl
              bg-white/5
              border
              border-white/10
              hover:bg-white/10
              transition
              font-semibold
            "
          >

            Explore Dashboard

          </Link>

        </div>

      </section>


      {/* Features Section */}

      <section className="
        relative
        z-10
        px-6
        pb-24
      ">

        <div className="
          grid
          grid-cols-1
          md:grid-cols-3
          gap-8
          max-w-6xl
          mx-auto
        ">

          {/* Card 1 */}

          <div className="
            bg-[#111827]
            border
            border-white/10
            rounded-3xl
            p-8
            shadow-2xl
          ">

            <div className="
              text-4xl
              mb-5
            ">
              📈
            </div>

            <h2 className="
              text-2xl
              font-bold
              mb-4
            ">

              Momentum Analytics

            </h2>

            <p className="
              text-gray-400
              leading-relaxed
            ">

              Visualize your coding consistency
              using smart momentum graphs and
              daily performance tracking.

            </p>

          </div>


          {/* Card 2 */}

          <div className="
            bg-[#111827]
            border
            border-white/10
            rounded-3xl
            p-8
            shadow-2xl
          ">

            <div className="
              text-4xl
              mb-5
            ">
              🎯
            </div>

            <h2 className="
              text-2xl
              font-bold
              mb-4
            ">

              Daily Targets

            </h2>

            <p className="
              text-gray-400
              leading-relaxed
            ">

              Organize today's coding tasks,
              track solved questions, and stay
              focused on placement preparation.

            </p>

          </div>


          {/* Card 3 */}

          <div className="
            bg-[#111827]
            border
            border-white/10
            rounded-3xl
            p-8
            shadow-2xl
          ">

            <div className="
              text-4xl
              mb-5
            ">
              🔥
            </div>

            <h2 className="
              text-2xl
              font-bold
              mb-4
            ">

              Streak System

            </h2>

            <p className="
              text-gray-400
              leading-relaxed
            ">

              Build long coding streaks and
              maintain consistency throughout
              your DSA and interview journey.

            </p>

          </div>

        </div>

      </section>

    </div>

  );
}

export default Home;
