import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class MainItem extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const {
      style,
      name,
      price,
      original_price,
      thumbnail_image_url,
      cN,
      no,
      offsetX
    } = this.props;

    return (
      <>
        <li
          onClick={() => this.props.history.push(`/detail/${no}`)}
          style={{
            transform: `translateX(${offsetX}px)`
            // marginLeft: `${offsetX - 10}px`
          }}
          className={cN}
        >
          <div
            style={{
              position: "relative",
              width: "249px",
              height: "320px",
              overflow: "hidden"
            }}
          >
            {price !== original_price ? (
              <div className="sale-box">
                <p style={{ fontSize: "13px" }}>SAVE</p>
                <p>
                  <span>
                    {Math.round(100 - (price / original_price) * 100)}
                  </span>
                  %
                </p>
              </div>
            ) : null}
            <img className="zoom-in" src={thumbnail_image_url} alt="goods" />
          </div>
          <div style={{ wordBreak: "break-all" }}>
            <p style={{ marginTop: "12px" }}>{name}</p>
            <p style={{ fontWeight: "700", paddingTop: "6px" }}>
              {price.toLocaleString()}원
            </p>
            {price === original_price ? null : (
              <p
                style={{
                  paddingTop: "4px",
                  textDecoration: "line-through",
                  color: "#ccc",
                  fontSize: "14px"
                }}
              >
                {original_price.toLocaleString()}원
              </p>
            )}
          </div>
        </li>
      </>
    );
  }
}

export default withRouter(MainItem);
