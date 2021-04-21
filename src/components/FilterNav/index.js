import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
function Filternav({ slug }) {
  const [currentSlugId, setcurrentSlugId] = useState(slug);
  const category = useSelector((state) => state.category);
  const categoryList = category.categoriesList;

  function doSomething() {
    setcurrentSlugId(1);
    console.log("i am clicked");
  }

  useEffect(() => {
    console.log("rendeer");
  }, []);
  console.log(currentSlugId);
  return (
    <div>
      <button onClick={doSomething}> click </button>
    </div>
  );
}

export default Filternav;
