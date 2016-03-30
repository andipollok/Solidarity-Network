import React from 'react';
import classNames from 'classnames';

export default React.createClass({

  render() {
    if (this.props && this.props.imageUrl) {
      var img = <img src={this.props.imageUrl} />;
    }
    var divClass = classNames('avatarImageContainer', {
      small: this.props.size === 'small'
    });
    
    return (
      <span className='avatar'>
        <span className={divClass}>
          {img}
        </span>
      </span>
    );
  }
});

