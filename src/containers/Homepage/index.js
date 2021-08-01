import React from "react";
import Layout from "../../components/Layout";
import Banner from "../../components/UI/banner";
import TestSlick from "../../components/UI/TestSlick";
import ItemCards from "../../components/UI/Cards/ItemCards";
const HomePage = () => {
  // console.log("home page");

  return (
    <div>
      <Layout>
        <Banner></Banner>
        <TestSlick></TestSlick>
        <ItemCards></ItemCards>
      </Layout>
    </div>
  );
};

export default HomePage;
