import React, {Component} from 'react';
import {Link} from 'react-router';
import StatusBar from './StatusBar';

export default class extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const {id, fetchCallback} = this.props;

    setTimeout(() => fetchCallback(id), 300);

    this.interval = setInterval(() => {
      const {status, updateItemStatus} = this.props;
      const _status = this.getStatus();
      if (_status != status) updateItemStatus(id, _status);
    }, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getStatus() {
    const { status, end_at, start_at, total_amount} = this.props;

    const now = Date.now();
    if (total_amount < 1) return 'suspend';
    if (status != 'timing') return status;
    if (now < start_at) return 'wait';
    if (now > end_at) return 'end';
    return 'started';
  }

  render() {
    const {title, cover_urls, price, ori_price, id, status} = this.props;
    return (
      <li className="item">
        <Link to={`/detail/${id}`}>
          <div className="left">
            <img className="avatar" src={cover_urls[0]}/>
          </div>
          <div className="right">
            <h3 className="title">{title}</h3>
              <span className="price">￥{price}</span>
              <span className="ori_price">原价:<s>{ori_price}</s></span>
            <StatusBar status={status}/>
          </div>
        </Link>
      </li>
    );
  }
}
