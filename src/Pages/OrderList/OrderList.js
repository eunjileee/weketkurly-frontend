import React, { Component } from "react";
import Nav from "../../Components/Layout/Nav";
import MyPage from "../../Components/OrderList/MyPage";
import MyKurly from "../../Components/OrderList/MyKurly";
import MyOrderList from "../../Components/OrderList/MyOrderList/MyOrderList";
import List from "../../Components/OrderList/MyOrderList/List";
import Footer from "../../Components/Layout/Footer";
import "./OrderList.scss";
import { API_JONG } from "../../global/env";

export default class OrderList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      order: [],
      dataProps: {},
      itemList: [],
      convertedArr: []
    };
  }

  componentDidMount = () => {
    this.getAPIData();
    // fetch("http://localhost:3000/data/order.json")
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState({
    //       order: res.order
    //     });
    //   });
  };

  getAPIData = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", sessionStorage.getItem("wetoken"));
    myHeaders.append("Content-Type", "application/json");

    // const cart = await fetch(`${API_JONG}/orders/cart`, {
    const cart = await fetch(`${API_JONG}/orders`, {
      method: "GET",
      headers: myHeaders
    });
    // const cart = await fetch("http://localhost:3000/data/cart.json");
    const cartJSON = await cart.json();

    this.setState(
      {
        dataProps: cartJSON.data
      },
      () => {
        this.setState(
          {
            itemList: [
              ...this.state.dataProps.map(param => {
                return {
                  no: param.order_number,
                  date: param.created_at,
                  products: param.product
                };
              })
            ]
          },
          () => this.convertArr(this.state.itemList)
        );
      }
    );
  };

  convertArr = arr => {
    // products - discounted_price, ea, name, original_price, thumbnail_image_url

    let sum = 0;
    let resultArr = [];

    // for (let i of arr[0].products) {
    //   sum += i.discounted_price;
    // }

    for (let i = 0; i < arr.length; i++) {
      for (let j = 0; j < arr[i].products.length; j++) {
        sum += arr[i].products[j].discounted_price;
      }
      resultArr.push({
        product_name: `${arr[i].products[0].name} 외 ${arr[i].products.length -
          1}`,
        no: arr[i].no,
        thumbnail_image_url: arr[i].products[0].thumbnail_image_url,
        price: sum,
        time: arr[i].date
      });
    }

    this.setState({ convertedArr: resultArr });
  };

  render() {
    return (
      <div className="OrderList">
        <Nav />
        <MyPage />
        <div className="contents">
          <MyKurly />
          <MyOrderList
            orderlist={this.state.convertedArr.map(el => {
              return (
                <List
                  key={el.no}
                  no={el.no}
                  product_name={el.product_name}
                  status={el.status}
                  thumb={el.thumbnail_image_url}
                  review_button_flag={el.review_button_flag}
                  price={el.price}
                  time={el.time}
                />
              );
            })}
          />
        </div>
        <Footer />
      </div>
    );
  }
}
