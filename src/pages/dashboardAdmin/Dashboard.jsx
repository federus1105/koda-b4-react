import React from "react";
import StatusOn from "../../components/dashboardAdmin/cardStatus/StatusOn";
import StatusShipping from "../../components/dashboardAdmin/cardStatus/StatusShipping";
import StatusDone from "../../components/dashboardAdmin/cardStatus/StatusDone";
import Chart from "../../components/dashboardAdmin/chart/Chart";
import Products from "../../components/dashboardAdmin/products/Products";

function Dashboard() {
  return (
    <>
      <div className="flex flex-col gap-4 md:gap-8">
        <header className="flex flex-col gap-4 md:flex-row">
          <StatusOn />
          <StatusShipping />
          <StatusDone />
        </header>
        {/* --- DATA --- */}
        <Chart />
        <Products />
      </div>
    </>
  );
}

export default Dashboard;
