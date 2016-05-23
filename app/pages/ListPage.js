import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import Loading from 'halogen/ScaleLoader';
import DRCode from '../components/DRCode';
import CountTo from 'react-count-to';

import * as Actions from '../actions';
import * as Signup from '../actions/signup';
import ItemsGroup from '../components/ItemsGroup';

class ListPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showDRText: false
    };
  }

  componentDidMount() {
    const {dispatch} = this.props;
    dispatch(Actions.fetchList());
    dispatch(Signup.fetchSignupNumber());
  }

  onScroll(e) {
    const {scrollTop, scrollHeight, offsetHeight} = e.target;
    if (scrollTop + offsetHeight == scrollHeight) {
      this.setState({showDRText: true});
    } else {
      this.setState({showDRText: false});
    }
  }

  slideDown() {
    const timestamp = `${__TIMESTAMP__}`;
    let data = JSON.parse(localStorage.getItem(timestamp));

    if (!data) {
      data = { 'introductionDisabled': false };
      localStorage.setItem(timestamp, JSON.stringify(data));
    }

    if (data.introductionDisabled) return;

    const link = this.refs['share-link'];
    const page = this.refs['list-page'];
    const { offsetHeight } = link;

    page.style.top = offsetHeight + 'px';
  }

  slideUp(e) {
    e.stopPropagation();

    const page = this.refs['list-page'];
    page.style.top = '0';

    const timestamp = `${__TIMESTAMP__}`;
    const data = JSON.parse(localStorage.getItem(timestamp));
    data.introductionDisabled = true;
    localStorage.setItem(timestamp, JSON.stringify(data));
  }

  sortByPrice(priceArr) {
    const {list: {items}, dispatch} = this.props;
    const boundActionCreators = bindActionCreators(Actions, dispatch);
    return priceArr.map(price =>
      <ItemsGroup
        key={price}
        price={price}
        items={items.filter(item => item.price == price)}
        boundActionCreators={boundActionCreators}
      />);
  }

  otherPrice(priceArr) {
    const {list: {items}, dispatch} = this.props;
    const boundActionCreators = bindActionCreators(Actions, dispatch);
    return (
      <ItemsGroup
        key="other"
        price="other"
        items={items.filter(item => !priceArr.includes(+item.price))}
        boundActionCreators={boundActionCreators}
      />
    );
  }

  render() {
    const {list: {listFetched}, signup: {signupNumber}} = this.props;

    return (
      <div className="page-container">
        {__QR_CODE__ && <DRCode showText={this.state.showDRText}/>}
        <div className="list-page-container" onScroll={this.onScroll.bind(this)}>
          <span className="close-btn" onClick={this.slideUp.bind(this)}>
            <img src="http://wanliu-piano.b0.upaiyun.com/uploads/shop_category/image/a85ffb6fdda0f6a165b2a0be83247f25.png" />
          </span>
          <a className="share-link" ref="share-link" href={__INTRODUCTION_LINK__}>
            <img className="share-pic" src={__INTRODUCTION_POSTER__}
              onLoad={this.slideDown.bind(this)}/>
          </a>
          <div className="list-page" ref="list-page">
            <div className="poster-container">
              <img className="list-poster" src={__LIST_IMG__}/>
              <div className="signup-count">¥
                <CountTo to={signupNumber} speed={1234} />元
              </div>
            </div>
            {!listFetched && <div style={{textAlign: 'center'}}><Loading color="#FFF" size="9px" margin="4px"/></div>}
            <ul className="list">
              {this.sortByPrice([1, 3, 5, 10])}
              {this.otherPrice([1, 3, 5, 10])}
            </ul>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    list: state.list,
    signup: state.signup
  };
}

export default connect(mapStateToProps)(ListPage);
