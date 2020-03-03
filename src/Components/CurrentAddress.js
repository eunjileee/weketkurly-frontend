import React, { Component } from "react";

export default class CurrentAddress extends Component {
  render() {
    return (
      <>
        <tr className="address">
          <th>주소</th>
          <td>
            <input
              value="서울 강서구 화곡동 504-162 (수정맨션) [157-894]"
              className="address-main"
            />
            <input value="202호" />
            <span>29자 / 85자</span>
            <div className="road">
              서울 강서구 등촌로13나길 38 (수정맨션) [07733] 202호
            </div>
          </td>
        </tr>
        <tr className="deli">
          <th>배송 구분</th>
          <td>
            <span className="txt">샛별배송지역</span>
            <p>
              <span>
                샛별 배송 지역 중 아래 장소는 <b>배송 불가 장소</b>
                입니다.
                <br />
                <b>▶ 배송 불가 장소 :</b> 관공서/ 학교/ 병원/ 시장/ 공단 지역/
                산간 지역/ 백화점 등
              </span>
            </p>
          </td>
        </tr>
        <tr className="receive-name">
          <th>수령인 이름 *</th>
          <td>
            <input type="text" value="이은지" />
          </td>
        </tr>
        <tr className="receive-phone">
          <th>휴대폰 *</th>
          <td>
            <input type="number" value="010" className="first-number" />
            <span className="bar">
              <span />
            </span>
            <input type="number" value="6203" className="second-number" />
            <span className="bar">
              <span />
            </span>
            <input type="number" value="2452" className="second-number" />
          </td>
        </tr>
        <tr className="memo">
          <th>배송 요청사항</th>
          <td>
            <textarea maxLength="50" />
            <div className="string">0자 / 50자</div>
          </td>
        </tr>
        <tr className="gate">
          <th>공동현관 출입 방법 *</th>
          <td>
            <label className="lebel-radio">
              <input type="radio" name="gate" />
              비밀번호
            </label>
            <label className="lebel-radio">
              <input type="radio" name="gate" />
              경비실 호출
            </label>
            <label className="lebel-radio">
              <input type="radio" name="gate" checked="checked" />
              자유출입가능
            </label>
            <label className="lebel-radio">
              <input type="radio" name="gate" />
              기타사항
            </label>
          </td>
        </tr>
        <tr className="msg">
          <th>배송완료 메세지 전송시점 *</th>
          <td>
            <label className="lebel-radio">
              <input type="radio" name="time" checked="checked" />
              배송직후
            </label>
            <label className="lebel-radio">
              <input type="radio" name="time" />
              오전 7시
            </label>
          </td>
        </tr>
        <tr className="save">
          <th checked>출입정보 저장</th>
          <td>
            <label className="label-checked">
              <input type="checkbox" checked="checked" />
              출입정보 저장
              <div>공동현관 출입방법, 배송완료메세지 전송시점 저장</div>
            </label>
          </td>
        </tr>
      </>
    );
  }
}
