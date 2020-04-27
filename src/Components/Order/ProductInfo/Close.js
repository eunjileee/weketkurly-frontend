import React, { Component } from "react";
import "./Close.scss";

export default class Close extends Component {
  render() {
    return (
      <div className="product-info">
        <h2>상품정보</h2>
        <table className="product-info-table">
          <tbody>
            <tr>
              <td>
                <div className="name">
                  {this.props.listCart.length !== 0 &&
                    `${this.props.listCart[0].name} 외 ${this.props.listCart
                      .length - 1}개 상품을 주문합니다.`}
                </div>
                <div
                  className="detail-btn"
                  onClick={this.props.handleChangeDetail}
                >
                  상세보기
                  <img
                    src="https://res.kurly.com/pc/ico/1803/ico_arrow_open_28x16.png"
                    alt="ico"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
