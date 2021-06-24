import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import HomeStyle from '../css/HomeStyle.module.css';
import '../css/CartboxStyle.css';

import { TOP, BOTTOM } from './Home';

class Cartbox extends Component {
  state = {
    keyword: '',
    products: [],
  };

  componentDidMount() {
  }
  

  render() {
    return (
    <div className={HomeStyle.body_wrap}>
      <TOP/>
      <div id="content">
        <div className="content_wrap">
            <div className="l_content">
                {/* 서비스 컨텐츠 */}
                <div className="s_order">

                    <div className="l_order_header">
                        <div className="b_order_header">
                            <div className="c_order_title"> <h1 className="c_order_header">장바구니</h1> </div>
                            <div className="c_order_step">
						        <ul className="step">
                                    {/* D : 활성페이지 active 클래스 추가 */}
                                    <li className="active"><i className="number">01</i> 장바구니</li>
                                    <li className="second "><i className="number">02</i> 주문서</li>
                                    <li><i className="number">03</i> 주문완료</li>
						        </ul>
					        </div>
                        </div>
                    </div>

                    <div className="l_order_content_wrap">

                        <div className="l_order_content">
                            <div className="b_order_cart_top">
                                <span className="all_check">
                                    <label className="c_order_checkbox">
                                        <input type="checkbox"/>
                                            <span>전체선택<span id="checkPrdCnt"></span></span>
                                    </label>
                                </span>

                                <button type="button">선택삭제</button>
                            </div>

                            <div className="b_order_cart_wrap">
                                <div className="c_order_cart_list">
                                    <div className="empty_cart">
                                        <p className="txt">장바구니에 담긴 상품이 없습니다.</p>
                                        <p className="sub_txt">로그인하시면 상품을 확인할 수 있습니다.</p>
                                        <div data-log-actionid-area="login" data-is-ab-send="1">
										    <a href="javascript:loginCart();" type="button" className="c_order_btn" data-log-actionid-label="login" onclick="rakeLog.sendRakeLog(this);">로그인</a>
									</div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="l_order_side">
                            <h3 className="skip">주문/결제 정보</h3>
                            <div className="c_order_amount">
								<div className="c_order_title c_order_style_2">
									<h4 className="title">결제 예정금액</h4>
								</div>
								<div className="c_order_content">
									<dl>
										<div className="price_field">
											{/* <dt>상품금액</dt> */}
											<dd><em className="number" id="spanSumPrcAmt">0</em>원</dd>
										</div>
										<div className="price_field" id="sunnary_delivery" display="none">
											<dt>배송비 (선결제)</dt>
											<dd><em className="number" id="spanSumDlvAmt">0</em>원</dd>
										</div>
										
										<div className="price_field discount">
											 
											<dt>할인금액<button type="button" className="btn_icon more" aria-expanded="false" data-log-actionid-label="discount_extention" disabled="disabled" data-log-body="{&quot;visible&quot;:&quot;false&quot;}">상세보기</button></dt>
											<dd><em className="number" id="spanTotalDscAmt">0</em>원</dd>
											<dd>
												<dl className="list_discount">
													<div className="discount_field" id="spanSumCouponAmtAll" display="none">
														<dt>즉시할인</dt>
														<dd><span className="number" id="spanSumCouponAmt">- 0</span>원</dd>
													</div>
													<div className="discount_field" id="spanSumPrdPluDscAmtAll" display="none">
														<dt>복수할인</dt>
														<dd><span className="number" id="spanSumPrdPluDscAmt">- 0</span>원</dd>
													</div>
													<div className="discount_field" id="spanSumCoupDscAmtAll" display="none">
														<dt>상품쿠폰</dt>
														<dd><span className="number" id="spanSumCoupDscAmt">- 0</span>원</dd>
													</div>
													<div className="discount_field" id="spanSellerBundleDscAmtAll" display="none">
														<dt>스토어할인</dt>
														<dd><span className="number" id="spanSellerBundleDscAmt">- 0</span>원</dd>
													</div>
													<div className="discount_field" id="spanSumPartnerSkDscRtAll" display="none">
														<dt>임직원할인</dt>
														<dd><span className="number" id="spanSumPartnerSkDscRt">- 0</span>원</dd>
													</div>
												</dl>
											</dd>
										</div>
									</dl>
									<div className="c_order_total_price">
										<h4 className="txt_total">합계</h4>
										<span className="price"><em className="number" id="spanTotalOrderAmt">0</em>원</span>
										<span className="delivery" id="cashDlvAmtAll" display="none">착불배송비 <em className="number" id="cashDlvAmt">0</em>원 미포함</span>
										<span className="delivery" id="cashDlvAmtFix" display="none">착불배송비 미포함</span>
									</div>
								</div>
							</div>

                            <div className="c_order_button" data-log-actionid-area="function">
								<button type="button" className="btn_order" id="doOrderBt" onclick="funcChkOrder(); doCommonStat('SCCT002'); chkAllPrdSelectList(this, 'check');" data-log-actionid-label="select_product_order" data-log-body="{&quot;basket_sequence_list&quot;:&quot;&quot;,&quot;mart_basket_sequence_list&quot;:&quot;&quot;}">주문하기</button>

								<div className="c_layer active" role="dialog" aria-modal="true" aira-hidden="false" id="agree_order_make_prds" aria-labelledby="ar-layerbuy_title" display="none">
                                    
									<h5 className="layer_tit" id="ar-layerbuy_title">주문제작 상품 구매 안내</h5>
									<div className="layer_cont">
										<div className="info_box">
											<p className="txt" id="orderMakePrdInfo"></p>
											<div className="box_model">
												{/* <p className="txt">해당상품은 고객님의 주문사항에 맞춰 <strong>제작되는 상품</strong>이므로 판매자의 의사에 반하여 <strong>취소 및 교환, 반품이 불가능</strong>합니다.(상품하자 시 제외)<br>이에 동의 하시는 경우 <span className="point">"동의"</span>버튼을 클릭해주세요.</p> */}
											</div>
										</div>
										<div className="layer_btn_wrap">
											<a id="agreeBcktSeq" href="#" className="c_layer_btn c_layer_btn_style2"><span>동의</span></a>
											<a href="javascript:hideAgreeOrderMakePrd('agree_order_make_prds');" class="c_layer_btn c_layer_btn"><span>취소</span></a>
										</div>
									</div>
								</div>

							</div>
                        </div>
                    </div>

                </div>

            </div>
          
        </div>
      </div>
      <BOTTOM/>
    </div>
    );
  }
}

export default Cartbox;