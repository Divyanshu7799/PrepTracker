
function QuestionCard(props) {

  const difficultyColors = {

    Easy: "bg-emerald-500/20 text-emerald-300",

    Medium: "bg-yellow-500/20 text-yellow-300",

    Hard: "bg-red-500/20 text-red-300"

  };


  return (

    <div className="
      bg-[#111827]
      border
      border-white/10
      rounded-3xl
      p-6
      shadow-xl
      hover:border-blue-400/20
      transition-all
      duration-300
      flex
      flex-col
      md:flex-row
      md:items-center
      md:justify-between
      gap-6
    ">

      {/* Left Section */}

      <div>

        {/* Title */}

        <h2 className="
          text-2xl
          font-bold
          text-white
          mb-3
        ">

          {props.title}

        </h2>


        {/* Info Row */}

        <div className="
          flex
          items-center
          gap-3
          flex-wrap
        ">

          {/* Difficulty */}

          <span className={`
            px-4
            py-1
            rounded-full
            text-sm
            font-semibold

            ${difficultyColors[props.difficulty]}
          `}>

            {props.difficulty}

          </span>


          {/* Topic */}

          {
            props.topic && (

              <span className="
                px-4
                py-1
                rounded-full
                bg-blue-500/10
                text-blue-300
                text-sm
                font-medium
              ">

                {props.topic}

              </span>

            )
          }

        </div>

      </div>


      {/* Buttons */}

      <div className="
        flex
        gap-3
        flex-wrap
      ">

        {/* Solve Button */}

        <button

          onClick={props.onSolve}

          className={`

            px-5
            py-3
            rounded-2xl
            font-semibold
            transition-all
            duration-300

            ${

             props.solved

  ? "bg-emerald-400/90 hover:bg-emerald-400"

  : "bg-blue-400/90 hover:bg-blue-400"

            }

          `}
        >

          {

            props.solved

              ? "Solved ✅"

              : "Mark Solved"

          }

        </button>


        {/* Delete Button */}

        <button

          onClick={props.onDelete}

          className="
            px-5
            py-3
            rounded-2xl
            bg-rose-400/90
            hover:bg-rose-400
            transition-all
            duration-300
            font-semibold
          "
        >

          Delete

        </button>

      </div>

    </div>

  );
}

export default QuestionCard;

