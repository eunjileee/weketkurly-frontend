import React, { Component } from "react";
import Nav from "../../Components/Layout/Nav";
import Open from "../../Components/Order/ProductInfo/Open";
import Close from "../../Components/Order/ProductInfo/Close";
import UserInfo from "../../Components/Order/UserInfo/UserInfo";
import DeliveryInfo from "../../Components/Order/DeliveryInfo/DeliveryInfo";
import Notice from "../../Components/Order/DeliveryInfo/Notice";
import PaymentBar from "../../Components/Order/PaymentBar/PaymentBar";
import Cupon from "../../Components/Order/CuponInfo/Cupon";
import PaymentMethod from "../../Components/Order/Payment method/PaymentMethod";
import PersonalInfo from "../../Components/Order/PersonalInfo/PersonalInfo";
import Footer from "../../Components/Layout/Footer";
import "./Order.scss";
import { API_JONG } from "../../global/env";

export default class Order extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: false,
      top: 0,
      scrollTop: 0,
      isChecked: false,
      list: [],
      point: 456,
      discount: "",
      name: "",
      usePoint: false,

      // 카드결제
      monthArrData: [],
      pointValue: "",
      description: "",

      // Kakao Postcode API
      addr: "",
      extraAddr: "",
      postcode: "",
      targetValue: "",
      text: "",

      listCart: [],
      myInfo: {},
      myAddress: []
    };
  }

  componentDidMount = () => {
    window.addEventListener("scroll", this.onScroll);
    this.getPayData();
    this.getCartData();
    this.getMyInfo();
    this.getAddress();
  };

  goPay = async (
    receiver_name,
    receiver_phone,
    delivery_request,
    new_address,
    address
  ) => {
    const { addr, extraAddr, postcode, targetValue } = this.state;
    const myHeaders = new Headers();
    myHeaders.append("Authorization", sessionStorage.getItem("wetoken"));

    console.log(
      `${addr} ${extraAddr} ${postcode} ${targetValue}`,
      this.state.myAddress[0].address
    );

    const data = await fetch(`${API_JONG}/orders`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({
        receiver_name: this.state.myInfo.name,
        receiver_phone: this.state.myInfo.phone,
        delivery_request: "8282",
        address: this.state.isChecked
          ? `${addr} ${extraAddr} ${postcode} ${targetValue}`
          : this.state.myAddress[0].address
      })
    });
    console.log("request res", data);

    if (data.status === 200) {
      alert("정상적으로 구매되었습니다");
      this.props.history.push("/orderlist");
    } else {
      alert("예외 발생");
    }
  };

  getAddress = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", sessionStorage.getItem("wetoken"));

    const address = await fetch(`${API_JONG}/users/address`, {
      method: "GET",
      headers: myHeaders
    });
    const addressJSON = await address.json();

    console.log("addressJSON", addressJSON.data);

    this.setState({ myAddress: addressJSON.data });
  };

  getMyInfo = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", sessionStorage.getItem("wetoken"));
    myHeaders.append("Content-Type", "application/json");

    const user = await fetch(`${API_JONG}/users/mypage`, {
      method: "GET",
      headers: myHeaders
    });
    const userJSON = await user.json();

    this.setState({ myInfo: userJSON });
    console.log(userJSON);
  };

  getCartData = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", sessionStorage.getItem("wetoken"));

    const data = await fetch(`${API_JONG}/orders/cart`, {
      method: "GET",
      headers: myHeaders
    });
    const dataJSON = await data.json();

    console.log(dataJSON);
    this.setState({ listCart: dataJSON.data });
  };

  getPayData = () => {
    fetch(`${API_JONG}/orders/card`)
      .then(res => res.json())
      .then(res => {
        this.setState({
          list: res.data
        });
      });
  };

  onScroll = e => {
    const scrollTop = ("scroll", e.srcElement.scrollingElement.scrollTop);
    if (scrollTop < 1900) {
      this.setState({
        top: 0
      });
    } else if (scrollTop > 1900 && scrollTop < 2550) {
      this.setState({
        top: scrollTop - 1890,
        scrollTop: scrollTop
      });
    }
  };

  handleChangeDetail = () => {
    this.setState({
      detail: true
    });
  };

  handleChangeAdr = e => {
    this.setState({
      isChecked: !this.state.isChecked
    });
  };

  handleChange = e => {
    let monthArr = [];
    let point = "";
    let description = "";
    let discount = "";
    for (let i in this.state.list) {
      if (e.target.value === this.state.list[i]["card_name"]) {
        monthArr = this.state.list[i]["installment_perioid"].map(element => {
          return <option key={element}>{element}</option>;
        });
        point = this.state.list[i]["card_point"];
        description = this.state.list[i]["card_description"];
        discount = this.state.list[i]["card_discount_event"];
      }
    }
    this.setState({
      [e.target.name]: e.target.value,
      monthArrData: monthArr,
      pointValue: point,
      discount: discount,
      description: description
    });
  };

  onChangeValue = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  onChangePoint = () => {
    this.setState({
      usePoint: !this.state.usePoint
    });
  };

  execPostCode = () => {
    new window.daum.Postcode({
      oncomplete: data => {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
        // const addr = ""; // 주소 변수
        // const extraAddr = ""; // 참고항목 변수

        //사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === "R") {
          // 사용자가 도로명 주소를 선택했을 경우
          this.setState({
            addr: data.roadAddress
          });
        } else {
          // 사용자가 지번 주소를 선택했을 경우(J)
          this.setState({
            extraAddr: data.jibunAddress
          });
        }

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if (data.userSelectedType === "R") {
          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            this.setState({
              extraAddr: this.state.extraAddr + data.bname
            });
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if (data.buildingName !== "" && data.apartment === "Y") {
              this.setState({
                extraAddr:
                  this.state.extraAddr + this.state.extraAddr !== ""
                    ? ", " + data.buildingName
                    : data.buildingName
              });
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if (this.state.extraAddr !== "") {
              this.setState({
                setAddr: " (" + this.state.extraAddr + ")"
              });
            }
            this.setState({
              extraAddr: this.state.extraAddr
            });
            // 조합된 참고항목을 해당 필드에 넣는다.
            // document.getElementById(
            //   "extraAddress"
            // ).value = this.state.extraAddr;
          } else {
            // document.getElementById("extraAddress").value = "";
            this.setState({
              extraAddr: ""
            });
          }

          this.setState({
            postcode: " [" + data.zonecode + "]",
            addr: this.state.addr
          });
        }
      }
    }).open();
  };

  render() {
    const {
      detail,
      point,
      discount,
      usePoint,
      top,
      isChecked,
      monthArrData,
      pointValue,
      description,
      addr,
      extraAddr,
      postcode,
      targetValue,
      text,
      myAddress
    } = this.state;

    return (
      <div className="Order">
        <Nav />
        <div className="title">
          <h1>주문서</h1>
          <h3>주문하실 상품명 및 수량을 정확하게 확인해 주세요.</h3>
        </div>
        {detail ? (
          <Open
            listCart={this.state.listCart.length !== 0 && this.state.listCart}
            detail={detail}
          />
        ) : (
          <Close
            listCart={
              this.state.listCart.length !== 0 ? this.state.listCart : []
            }
            detail={detail}
            handleChangeDetail={this.handleChangeDetail}
          />
        )}
        <UserInfo myInfo={this.state.myInfo} />
        <DeliveryInfo
          isChecked={isChecked}
          addr={addr}
          extraAddr={extraAddr}
          postcode={postcode}
          execPostCode={this.execPostCode}
          onChange={this.onChangeValue}
          onChangeAdr={this.handleChangeAdr}
          targetValue={targetValue}
          text={text}
          myAddress={myAddress}
        />
        <Notice />
        <PaymentBar top={top} />
        <Cupon
          point={point}
          usePoint={usePoint}
          onChangeValue={this.onChangeValue}
          onChangePoint={this.onChangePoint}
        />
        <PaymentMethod
          options={this.state.list.map(el => {
            return (
              <option key={el.card_name} value={el.card_name}>
                {el.card_name}
              </option>
            );
          })}
          monthArrData={monthArrData}
          pointValue={pointValue}
          discount={discount}
          description={description}
          handleChange={this.handleChange}
          onChangeValue={this.onChangeValue}
        />
        <PersonalInfo goPay={this.goPay} />
        <Footer />
      </div>
    );
  }
}
