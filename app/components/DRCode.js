import React, {Component} from 'react';
import TransitionGroup from 'react-addons-css-transition-group';

export default class DRCode extends Component {
  constructor() {
    super();

    this.state = {
      showDRText: false
    };
  }

  componentDidMount() {
    this.interval = setInterval(() => {
      const desc = this.getDesc();
      const element = this.refs['drcode-text'];

      if (element) {
        element.innerText = desc;
      }
    }, 4000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  getDesc() {
    const descs = ['关注更多优惠惊喜!', '分享后可再次抢购!'];
    const index = Math.floor(Math.random() * 2);
    const desc = descs[index];

    return desc;
  }

  updateShowText(bool) {
    this.setState({ showText: bool });
  }

  render() {
    return (
      <div className="dr-container">
        <TransitionGroup transitionName="left" component="div" transitionEnterTimeout={500} transitionLeaveTimeout={500}>
          {this.state.showText && <div className="dr-text" key="drcode-text" ref="drcode-text">{this.getDesc()}</div>}
        </TransitionGroup>
        <img className="dr-img" src="http://wanliu-piano.b0.upaiyun.com/uploads/shop/poster/100193/6b4bfbba51112dffcf9915d82cd098d7.jpg" alt="dr"/>
      </div>
    );
  }
}

DRCode.defaultProps = {
  showText: false,
};
