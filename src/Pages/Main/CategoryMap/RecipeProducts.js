import React from "react";

const RecipeProducts = ({ title, recipes }) => {
  const recipeList =
    recipes &&
    recipes.map((param, idx) => {
      return (
        <div key={"rcpe" + idx} className="product-item">
          <ul>
            <li>
              <a
                href={param["landing_url"]}
                style={{
                  textDecoration: "none",
                  color: "#333",
                  fontSize: "16px",
                  textAlign: "center",
                  overflow: "hidden",
                  display: "block",
                  width: "249px",
                  height: "320px"
                }}
              >
                <img
                  className="recipe-img zoom-in"
                  key={idx}
                  // src={param["image_url"]}
                  src={param["image"]}
                  alt="review"
                />
                <p style={{ marginTop: "12px" }}>{param["title"]}</p>
              </a>
            </li>
          </ul>
        </div>
      );
    });

  return (
    <>
      <p className="main-font">{title}</p>
      <div
        style={{
          position: "relative"
        }}
      >
        <button
          style={{ top: "97.5px" }}
          className="btn-scroll btn-scroll-left"
        ></button>
        <button
          style={{ top: "97.5px" }}
          className="btn-scroll btn-scroll-right"
        ></button>
      </div>
      <div
        style={{ overflow: "hidden", width: "1050px" }}
        className="goods-item"
      >
        {recipeList}
      </div>
    </>
  );
};

export default RecipeProducts;
