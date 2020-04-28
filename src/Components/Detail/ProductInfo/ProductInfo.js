import React, { Component } from "react";
import Count from "./Count";
import "./ProductInfo.scss";

export default class ProductInfo extends Component {
  render() {
    const {
      name,
      short_description,
      origin,
      original_price,
      price,
      point,
      unit_text,
      weight,
      delivery_time_type_text,
      number,
      expiration_date,
      guides,
      handleOnClickPlus,
      handleOnClickMinus
    } = this.props;

    return (
      <div className="product-info">
        <div className="product-title">
          <div className="title">
            <p>{name}</p>
            <div className="share-icon"></div>
          </div>
          <span>{short_description}</span>
        </div>

        <div className="price-bar">
          <span className="price">{price && price.toLocaleString()}</span>
          <span className="won">원</span>
          <span
            style={
              Number(
                (((original_price - price) / original_price) * 100).toFixed(0)
              ) === 0
                ? { display: "none" }
                : {
                    display: "inline-block",
                    paddingLeft: "7px",
                    fontWeight: "600",
                    fontSize: "28px",
                    color: "#fa622f",
                    lineHeight: "30px"
                  }
            }
          >
            {price &&
              (((original_price - price) / original_price) * 100).toFixed(0)}
            %
          </span>
        </div>

        <div className="accumulate">
          {/* <span className = "befor-login-point">로그인 후, 적립혜택이 제공됩니다.</span> */}
          <div className="after-login-point">
            <span className="save-point">일반 0.5%</span>
            <span className="each">개당</span>
            <span className="won-save">{point}원 적립</span>
          </div>
        </div>

        <div className="goods-info">
          <dl>
            <dt>판매단위</dt>
            <dd>{unit_text}</dd>
          </dl>
          <dl className="list">
            <dt>중량/용량</dt>
            <dd>{weight}</dd>
          </dl>
          <dl className="list">
            <dt>배송구분</dt>
            <dd>{delivery_time_type_text}</dd>
          </dl>
          <dl className="list">
            <dt>원산지</dt>
            <dd>{origin}</dd>
          </dl>
          <dl className="list">
            <dt>포장타입</dt>
            <dd>
              <div>냉장/종이포장</div>
              <div className="delivery">
                택배배송은 에코포장이 스티로폼으로 대체됩니다.
              </div>
            </dd>
          </dl>
          <dl className="list">
            <dt>유통기한</dt>
            <dd>{expiration_date}</dd>
          </dl>
          <dl className="list">
            <dt>안내사항</dt>
            <dd>{guides}</dd>
          </dl>
          <dl className="list">
            <dt>구매수량</dt>
            <dd>
              <Count
                number={number}
                handleOnClickPlus={handleOnClickPlus}
                handleOnClickMinus={handleOnClickMinus}
              />
            </dd>
          </dl>
        </div>
      </div>
    );
  }
}
