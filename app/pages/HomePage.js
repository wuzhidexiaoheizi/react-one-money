import fetch from 'isomorphic-fetch';
import React, {Component} from 'react';
import {connect} from 'react-redux';
import {formatTime} from '../helper';
import {_fetch} from '../helper';
import * as Signup from '../actions/signup';

class HomePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_at: '',
      end_at: '',
      showArrow: true
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;

    fetch(`${__API__}/${__ONE_MONEY_ID__}`)
    .then(res => res.json())
    .then(json => {
      this.setState({
        start_at: formatTime(Date.parse(json.start_at)),
        end_at: formatTime(Date.parse(json.end_at)),
      });
    });

    dispatch(Signup.fetchSignupNumber());
  }

  onScroll(e) {
    if (e.target.scrollTop > 200) {
      this.setState({showArrow: false});
    } else {
      this.setState({showArrow: true});
    }
  }

  _handleSignup() {
    const origin = window.location.origin;
    const pathname = window.location.pathname;
    const { history, location } = this.props;
    const { query } = location;
    let fromSeed = query.fromSeed;

    if (!fromSeed) {
      try {
        fromSeed = localStorage.getItem('from_seed_id');
        const expire_time = +localStorage.getItem('from_seed_expire_time');
        fromSeed = expire_time >= Date.now() ? fromSeed : null;
      } catch (e) {
        console.log('error info', e);
        fromSeed = null;
      }
    }

    const q = !!fromSeed ? `?from_seed=${fromSeed}` : '';

    _fetch(`${__API__}/${__ONE_MONEY_ID__}/signup${q}`, 'put')
    .then(() => {
      history.pushState(null, '/list');
    }).catch(err => {
      if (+err.message == 401) {
        const url = `${origin}${pathname}${q}`;
        window.location.href = __SIGNUP_URL__ + '?callback=' + encodeURIComponent(url) + '&goto_one_money=true';
      }
    });
  }


  downBtnClick() {
    const {homePage} = this.refs;
    homePage.scrollTop = homePage.scrollHeight - homePage.offsetHeight - 10;
  }

  render() {
    const {signup: {signupNumber}} = this.props;

    return (
      <div style={{position: 'absolute', width: '100%', height: '100%'}}>
        {this.state.showArrow && <img id="down-arrow" onClick={this.downBtnClick.bind(this)} src="http://wanliu-piano.b0.upaiyun.com/uploads/shop/poster/102/17f5c4fb9babb034ac10439036473b85.png"/>}
        <div className="page home-page" ref="homePage" onScroll={this.onScroll.bind(this)}>
          <img style={{minHeight: '400px'}} className="poster" src={__HOME_IMG__}/>
          <div className="introduction">
            <div className="introduction-text">
              <div className="introduction-item">
                <b>参与方式:</b>
                <div className="indent">关注我们的"耒阳街上"公众号之后，即可参与我们的线上抢购伊利大礼包活动</div>
              </div>

              <div className="introduction-item">
                <b>抢购规则:</b>
                <div className="indent">每位关注的用户（仅限耒阳市区）只能在一次活动中抢购一件的商品，抢购低至一元，抢完即刻恢复正常售价。抢购成功后请尽快确认订单。未确认的订单15分钟内将自动回收。确认订单后您还可以通过分享给好友获得额外的抢购机会。</div>
              </div>

              <div className="introduction-item">
                <b>商品发放:</b>
                <div className="indent">活动结束，我们将逐步发货至您填写的地址，邮费方式需货到付款</div>
              </div>

              <div className="introduction-item">
                <b>活动时间:</b>
                <div className="indent">
                  {this.state.start_at} 至 {this.state.end_at}
                </div>
              </div>
            </div>
            <div className="signup-container" onClick={this._handleSignup.bind(this)}>
              <span className="signup-btn" onClick={this._handleSignup.bind(this)}>
                <img width="160" src="http://wanliu-piano.b0.upaiyun.com/uploads/shop/logo/102/db8f7e169439eaec6b63fa5c50ba1766.png" />
              </span>
            </div>
            <div className="signup-count">
              已有{signupNumber}人参与
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    home: state.home,
    seed: state.seed,
    signup: state.signup
  };
}

export default connect(mapStateToProps)(HomePage);
