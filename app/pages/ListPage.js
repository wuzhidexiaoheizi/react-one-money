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

  shouldComponentUpdate(nextProps) {
    return nextProps.list.listFetched != this.props.list.listFetched;
  }

  onScroll(e) {
    const {scrollTop, scrollHeight, offsetHeight} = e.target;
    const drCode = this.refs.drCode;

    if (scrollTop + offsetHeight == scrollHeight) {
      drCode.updateShowText(true);
    } else {
      drCode.updateShowText(false);
    }
  }

  getSalesRatio(item) {
    const total_amount = item.total_amount;
    let completes = item.completes || 0;

    if (completes < 0) completes = 0;

    return total_amount ? completes / total_amount : 0;
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

  sortBySalesRatioAndPrice(items) {
    items.sort((a, b) => {
      const ratio1 = this.getSalesRatio(a);
      const ratio2 = this.getSalesRatio(b);

      if (ratio1 == 1) {
        return 1;
      }

      if (ratio1 < ratio2) {
        return -1;
      }

      if (ratio1 > ratio2) {
        return 1;
      }

      if (a.price < b.price) {
        return 1;
      }

      if (a.price > b.price) {
        return -1;
      }

      return 0;
    });
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

    return priceArr.map(price => {
      const _items = items.filter(item => item.price == price);

      if (`${__ADJUST_LIST_BY_RATIO__}`) {
        this.sortBySalesRatioAndPrice(_items);
      }

      return (<ItemsGroup
        key={price}
        price={price}
        items={_items}
        boundActionCreators={boundActionCreators}
      />);
    });
  }

  otherPrice(priceArr) {
    const {list: {items}, dispatch} = this.props;
    const boundActionCreators = bindActionCreators(Actions, dispatch);
    const _items = items.filter(item => !priceArr.includes(+item.price));

    if (`${__ADJUST_LIST_BY_RATIO__}`) {
      this.sortBySalesRatioAndPrice(_items);
    }

    return (
      <ItemsGroup
        key="other"
        price="other"
        items={_items}
        boundActionCreators={boundActionCreators}
      />
    );
  }

  render() {
    const {list: {listFetched}, signup: {signupNumber}} = this.props;

    return (
      <div className="page-container">
        {__QR_CODE__ && <DRCode ref="drCode" />}
        <div className="list-page-container" onScroll={this.onScroll.bind(this)}>
          <div className="list-page" ref="list-page">
            <div className="poster-container">
              <img className="list-poster" src={__LIST_IMG__}/>
              <div className="signup-count">¥
                <span className="count">
                  <CountTo to={signupNumber} speed={1000} />
                </span>元
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
