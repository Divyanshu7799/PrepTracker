
import Sidebar from "../components/Sidebar";

function DashboardLayout({ children }) {

  return (

    <div className="
      min-h-screen
      bg-[#0b1120]
      text-white
      flex
    ">

      {/* Sidebar */}

      <Sidebar />


      {/* Main Content */}

      <main className="
        flex-1
        min-h-screen
        p-8
        md:p-10
        overflow-y-auto
      ">

        {children}

      </main>

    </div>

  );
}

export default DashboardLayout;
