import React from 'react';
import { FormattedMessage } from 'react-intl';

export default class extends React.Component {

  render() {

    return (
      <div className="alert alert-danger">
        <strong>Something went wrong…</strong> {this.props.error} {this.props.message}
      </div>
    );
  }
};
