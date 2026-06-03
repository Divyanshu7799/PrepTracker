
function DashboardCard(props) {

  return (

    <div
      className="
        bg-[#111827]
        border
        border-white/10
        rounded-3xl
        p-6
        shadow-xl
        hover:border-blue-400/30
        hover:shadow-blue-500/10
        transition-all
        duration-300
        backdrop-blur-lg
      "
    >

      {/* Title */}

      <h2 className="
        text-gray-400
        text-sm
        font-medium
        tracking-wide
        mb-4
      ">

        {props.title}

      </h2>


      {/* Value */}

      <p className="
        text-4xl
        font-extrabold
        bg-gradient-to-r
        from-blue-400
        to-cyan-300
        text-transparent
        bg-clip-text
      ">

        {props.count}

      </p>

    </div>

  );
}

export default DashboardCard;

