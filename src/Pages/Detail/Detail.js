import React, { Component } from "react";
import Nav from "../../Components/Layout/Nav";
import ProductInfo from "../../Components/Detail/ProductInfo/ProductInfo";
import DetailSlide from "../../Components/Detail/Slide/DetailSlide";
import TotalPrice from "../../Components/Detail/ProductInfo/TotalPrice";
import CartBtn from "../../Components/Detail/ProductInfo/CartBtn";
import RelatedProductSlide from "../../Components/Detail/Slide/RelatedProductSlide";
import Tab from "../../Components/Detail/Detail/Tab";
import WhyKurly from "../../Components/Detail/Detail/WhyKurly";
import Customer from "../../Components/Detail/Detail/Customer";
import ProductDetail from "../../Components/Detail/Detail/ProductDetail";
import Review from "../../Components/Detail/ReviewQA/Review";
import Qa from "../../Components/Detail/ReviewQA/Qa";
import PopUp from "../../Components/CartPop/CartPop";
import Bar from "../../Components/Detail/Detail/Bar";
import Footer from "../../Components/Layout/Footer";
import "./Detail.scss";
import { API_JONG } from "../../global/env";
import DetailImage from "./DetailImage";

export default class Detail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      number: 1,
      price: 1000,
      point: 7,
      save: false,
      popUp: false,
      popUpCart: false,
      scroll: false,
      scrollTop: 0,
      display: false,
      moreBtn: false,
      translate: 0,
      data: [],
      info: [],

      //tab
      tabInfo: false,
      tabImg: false,
      tabDetail: false,
      tabReview: false,
      tabQA: false,

      // 장바구니로 Go!
      thumb: "",
      productName: "",
      popPrice: 0,
      nowCart: {},
      nowPath: this.props.location.pathname
    };
  }

  componentDidMount = () => {
    window.scroll(0, 0);
    this.getCartData();
    window.addEventListener("scroll", this.onScroll);
    this.getAPI();
  };

  getAPI = () => {
    fetch(
      `${API_JONG}/products/related/${
        this.props.location.pathname.split("/")[2]
      }`
    )
      .then(res => res.json())
      .then(res => {
        this.setState({
          relatedData: res.data
        });
      });

    fetch(`${API_JONG}/products/${this.props.location.pathname.split("/")[2]}`)
      .then(res => res.json())
      .then(res => {
        this.setState(
          {
            info: res.data
          },
          () => {
            this.setState({
              price: this.state.info.discounted_price,
              nowPath: this.props.location.pathname
            });
          }
        );
      });
  };

  componentDidUpdate(prevProps, prevState) {
    prevState.nowPath !== this.props.location.pathname && this.getAPI();
  }

  getCartData = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Authorization", sessionStorage.getItem("wetoken"));

    const data = await fetch(`${API_JONG}/orders/cart`, {
      method: "GET",
      headers: myHeaders
    });
    const dataJSON = await data.json();

    this.setState({ nowCart: dataJSON });
  };

  onScroll = e => {
    // 스크롤 할때마다 state에 scroll한 만큼 scrollTop 값 증가하므로 이를 업데이트해줌,
    //따라서 스크롤 시점에 따라 특정액션을 추후에 state를 활용하여 구현 가능
    const scrollTop = ("scroll", e.srcElement.scrollingElement.scrollTop);
    if (scrollTop > 1270) {
      this.setState({
        scroll: true,
        scrollTop: scrollTop
      });
    } else {
      this.setState({
        scroll: false
      });
    }
  };

  handleOnClickPlus = () => {
    this.setState({
      number: this.state.number + 1,
      price: this.state.price + this.state.info.discounted_price,
      point: this.state.point + 7
    });
  };

  handleOnClickMinus = () => {
    if (this.state.number <= 1) {
      this.setState({
        number: this.state.number,
        price: this.state.price,
        point: this.state.point
      });
    } else {
      this.setState({
        number: this.state.number - 1,
        price: this.state.price - this.state.info.discounted_price,
        point: this.state.point - 7
      });
    }
  };

  handleOnClickSave = () => {
    this.setState({
      save: true,
      popUp: !this.state.popUp
    });
  };

  togglePopUp = () => {
    this.setState({
      popUp: !this.state.popUp
    });
  };

  togglePopUpCart = () => {
    this.setState({
      popUpCart: !this.state.popUpCart
    });
  };

  handleOnClickNext = e => {
    this.setState({
      translate: this.state.translate === -1920 ? 0 : this.state.translate - 960
    });
  };

  handleOnClickBefore = e => {
    this.setState({
      translate: this.state.translate === 0 ? -1920 : this.state.translate + 960
    });
  };

  // 탭 클릭 시 해당 영역 이동
  MoveToProduct = () => {
    window.scrollTo(0, 1500, "smooth");
    // this.setState({
    //   tabInfo: true
    // });
  };

  MoveToImg = () => {
    window.scrollTo(0, 4050, "smooth");
    // this.setState({
    //   tabImg: true
    // });
  };

  MoveToInfo = () => {
    window.scrollTo(0, 5100, "smooth");
    // this.setState({
    //   tabDetail: true
    // });
  };

  MoveToReview = () => {
    window.scrollTo(0, 6950, "smooth");
    // this.setState({
    //   tabReview: true
    // });
  };

  MoveToQA = () => {
    window.scrollTo(0, 7600, "smooth");
    // this.setState({
    //   tabQA: true
    // });
  };

  onClickBarOpen = () => {
    this.setState({
      display: true
    });
  };

  onClickBarClose = () => {
    this.setState({
      display: false
    });
  };

  onClickMore = () => {
    this.setState({
      moreBtn: !this.state.moreBtn
    });
  };

  postCartItem = async (product_num, quantity) => {
    const goCart = { product_num: product_num, quantity: quantity };
    const myHeaders = new Headers();
    myHeaders.append("Authorization", sessionStorage.getItem("wetoken"));
    myHeaders.append("Content-Type", "application/json");

    await fetch(`${API_JONG}/orders/cart`, {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify(goCart)
    });
  };

  // 장바구니 버튼 클릭 시, 정보 넘겨주기
  onChangeCart = (url, name, price) => {
    this.postCartItem(this.state.info.no, this.state.number);
    this.setState({
      thumb: url,
      productName: name,
      popPrice: price
    });
  };

  render() {
    const {
      number,
      price,
      point,
      save,
      popUp,
      popUpCart,
      scroll,
      display,
      moreBtn,
      translate,
      info,
      data,
      relatedData
    } = this.state;

    // 상품 이미지
    const mainImg = info.detail_image_url;

    // 슬라이드 기능 구현
    const x = translate;
    const next = {
      transform: `translateX(${x}px)`
    };

    return (
      <div className="Detail">
        <Nav
          popPrice={this.state.popPrice}
          url={this.state.thumb}
          productName={this.state.productName}
        />
        <div className="product-top">
          <div
            className="product-img"
            style={{ backgroundImage: `url(${mainImg})` }}
          />

          {/* 상품 구매 정보 */}
          <ProductInfo
            name={info.name}
            short_description={info.short_description}
            origin={info.length !== 0 && info.origin}
            original_price={info.original_price}
            price={info.length !== 0 && info.discounted_price}
            point={point}
            unit_text={info.unit_text}
            weight={info.weight}
            delivery_time_type_text={info.delivery_time_type_text}
            number={number}
            expiration_date={info.expiration_date}
            guides={info.guides}
            handleOnClickPlus={this.handleOnClickPlus}
            handleOnClickMinus={this.handleOnClickMinus}
          />
        </div>

        {/* 가격정보 */}
        <div className="total-price-cart">
          <TotalPrice
            price={info.length !== 0 && this.state.price}
            point={point}
          />
          <CartBtn
            handleOnClickSave={this.handleOnClickSave}
            togglePopUp={this.togglePopUp}
            onChangeCart={() =>
              sessionStorage.getItem("wetoken")
                ? this.onChangeCart(mainImg, info.name, this.state.price)
                : () => alert("로그인 하세요")
            }
            save={save}
          />
          {popUp ? (
            <PopUp
              close={this.togglePopUp}
              txt="늘 사는 리스트에 추가했습니다."
            />
          ) : null}
          {popUpCart ? (
            <PopUp
              close={this.togglePopUpCart}
              txt="이미 동일한 상품이 장바구니에 존재합니다."
            />
          ) : null}
        </div>

        <RelatedProductSlide
          next={next}
          dataImg={
            relatedData &&
            this.state.relatedData.map((el, idx) => {
              return (
                <DetailSlide
                  key={el.idx}
                  img={el.list_image_url}
                  name={el.name}
                  price={el.original_price}
                  no={el.no}
                />
              );
            })
          }
          handleOnClickBefore={this.handleOnClickBefore}
          handleOnClickNext={this.handleOnClickNext}
        />

        {/* <Tab
          info={info}
          tabInfo={tabInfo}
          tabImg={tabImg}
          tabDetail={tabDetail}
          tabReview={tabReview}
          tabQA={tabQA}
          MoveToProduct={this.MoveToProduct}
          MoveToImg={this.MoveToImg}
          MoveToInfo={this.MoveToInfo}
          MoveToReview={this.MoveToReview}
          MoveToQA={this.MoveToQA}
        /> */}
        <div className="tab">
          <ul>
            <li
              className="tabOn"
              onClick={this.MoveToProduct}
              style={{ borderLeft: "1px solid #bfbfbf" }}
            >
              상품설명
            </li>
            <li className="tabOff" onClick={this.MoveToImg}>
              상품이미지
            </li>
            <li className="tabOff" onClick={this.MoveToInfo}>
              상세정보
            </li>
            <li className="tabOff" onClick={this.MoveToReview}>
              고객후기({info.review_count})
            </li>
            <li className="tabOff" onClick={this.MoveToQA}>
              상품문의(3)
            </li>
            <div className="line" />
          </ul>
        </div>
        <ProductDetail info={info} />
        <div className="tab">
          <ul>
            <li
              className="tabOff"
              onClick={this.MoveToProduct}
              style={{ borderLeft: "1px solid #bfbfbf" }}
            >
              상품설명
            </li>
            <li className="tabOn" onClick={this.MoveToImg}>
              상품이미지
            </li>
            <li className="tabOff" onClick={this.MoveToInfo}>
              상세정보
            </li>
            <li className="tabOff" onClick={this.MoveToReview}>
              고객후기({info.review_count})
            </li>
            <li className="tabOff" onClick={this.MoveToQA}>
              상품문의(3)
            </li>
            <div className="line" />
          </ul>
        </div>
        <DetailImage info={info} />
        {/* <img
          className="detail-info"
          src="//img-cf.kurly.com/shop/data/goodsview/20200304/gv00000083982_1.jpg"
          alt="detail-info"
        /> */}
        <div className="tab">
          <ul>
            <li
              className="tabOff"
              onClick={this.MoveToProduct}
              style={{ borderLeft: "1px solid #bfbfbf" }}
            >
              상품설명
            </li>
            <li className="tabOff" onClick={this.MoveToImg}>
              상품이미지
            </li>
            <li className="tabOn" onClick={this.MoveToInfo}>
              상세정보
            </li>
            <li className="tabOff" onClick={this.MoveToReview}>
              고객후기({info.review_count})
            </li>
            <li className="tabOff" onClick={this.MoveToQA}>
              상품문의(3)
            </li>
            <div className="line" />
          </ul>
        </div>
        <WhyKurly info={info} />

        <div className="full-line" />
        {/* <Customer moreBtn={moreBtn} onClickMore={this.onClickMore} /> */}
        <div className="tab">
          <ul>
            <li
              className="tabOff"
              onClick={this.MoveToProduct}
              style={{ borderLeft: "1px solid #bfbfbf" }}
            >
              상품설명
            </li>
            <li className="tabOff" onClick={this.MoveToImg}>
              상품이미지
            </li>
            <li className="tabOff" onClick={this.MoveToInfo}>
              상세정보
            </li>
            <li className="tabOn" onClick={this.MoveToReview}>
              고객후기({info.review_count})
            </li>
            <li className="tabOff" onClick={this.MoveToQA}>
              상품문의(3)
            </li>
            <div className="line" />
          </ul>
        </div>
        <Review />
        <div className="tab">
          <ul>
            <li
              className="tabOff"
              onClick={this.MoveToProduct}
              style={{ borderLeft: "1px solid #bfbfbf" }}
            >
              상품설명
            </li>
            <li className="tabOff" onClick={this.MoveToImg}>
              상품이미지
            </li>
            <li className="tabOff" onClick={this.MoveToInfo}>
              상세정보
            </li>
            <li className="tabOff" onClick={this.MoveToReview}>
              고객후기({info.review_count})
            </li>
            <li className="tabOn" onClick={this.MoveToQA}>
              상품문의(3)
            </li>
            <div className="line" />
          </ul>
        </div>
        <Qa />
        <Bar
          scroll={scroll}
          display={display}
          info={info}
          number={number}
          price={price}
          point={point}
          save={save}
          popUp={popUp}
          popUpCart={popUpCart}
          onClickBarOpen={this.onClickBarOpen}
          onClickBarClose={this.onClickBarClose}
          handleOnClickPlus={this.handleOnClickPlus}
          handleOnClickMinus={this.handleOnClickMinus}
          onChangeCart={this.onChangeCart}
        />
        <Footer />
      </div>
    );
  }
}
