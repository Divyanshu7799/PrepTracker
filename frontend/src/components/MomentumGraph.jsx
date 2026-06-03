
import {

  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid

} from "recharts";


function MomentumGraph({ questions }) {

  const dailyData = {};


  questions.forEach((question) => {

    const date = new Date(
      question.created_at
    ).toLocaleDateString();


    if (!dailyData[date]) {

      dailyData[date] = {

        total: 0,
        solved: 0

      };

    }


    dailyData[date].total += 1;


    if (question.solved) {

      dailyData[date].solved += 1;

    }

  });


  const graphData = Object.keys(dailyData)
    .map((date) => {

      const total =
        dailyData[date].total;

      const solved =
        dailyData[date].solved;


      const score = Math.floor(

        (solved / total) * 100

      );


      return {

        date,
        score

      };

    });


  return (

    <div className="
      bg-[#111827]
      border
      border-white/10
      rounded-3xl
      p-8
      shadow-2xl
      backdrop-blur-lg
      h-full
    ">

      {/* Header */}

      <div className="mb-8">

        <h2 className="
          text-2xl
          font-bold
          text-white
          mb-2
        ">

          Momentum Trend 📈

        </h2>


        <p className="
          text-gray-400
          text-sm
        ">

          Track your daily coding consistency

        </p>

      </div>


      {/* Graph */}

      <ResponsiveContainer
        width="100%"
        height={320}
      >

        <LineChart data={graphData}>

          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#1f2937"
          />


          <XAxis
            dataKey="date"
            stroke="#9ca3af"
            tick={{ fill: "#9ca3af" }}
          />


          <YAxis
            stroke="#9ca3af"
            tick={{ fill: "#9ca3af" }}
          />


          <Tooltip

            contentStyle={{

              backgroundColor: "#111827",

              border: "1px solid #374151",

              borderRadius: "16px",

              color: "#fff"

            }}

          />


          <Line

           type="natural"

            dataKey="score"

            stroke="#3b82f6"

            strokeWidth={4}

            dot={{

              r: 5,

              fill: "#60a5fa"

            }}

            activeDot={{

              r: 8

            }}

          />

        </LineChart>

      </ResponsiveContainer>

    </div>

  );
}

export default MomentumGraph;
