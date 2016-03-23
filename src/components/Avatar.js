import React from 'react';
import classNames from 'classnames';

export default React.createClass({

  render() {
    if (this.props && this.props.imageUrl) {
      var img = <img src={this.props.imageUrl} />;
    }
    var divClass = classNames('avatar', {
      small: this.props.size === 'small'
    });
    
    return (
      <span className={divClass}>
        {img}
      </span>
    );
  }
});

