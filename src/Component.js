import React from 'react';
import createReactClass from 'create-react-class';
import PropTypes from 'prop-types';
import copy from 'copy-to-clipboard';


export const CopyToClipboard = createReactClass({
  propTypes: {
    text: PropTypes.string.isRequired,
    children: PropTypes.element.isRequired,
    onCopy: PropTypes.func,
    options: PropTypes.shape({
      debug: PropTypes.bool,
      message: PropTypes.string
    })
  },


  onClick(event) {
    const {
      text,
      onCopy,
      children,
      options
    } = this.props;

    const elem = React.Children.only(children);

    const result = copy(text, options);

    if (onCopy) {
      onCopy(text, result);
    }

    // Bypass onClick if it was present
    if (elem && elem.props && typeof elem.props.onClick === 'function') {
      elem.props.onClick(event);
    }
  },


  render() {
    const {
      text: _text,
      onCopy: _onCopy,
      options: _options,
      children,
      ...props
    } = this.props;
    const elem = React.Children.only(children);

    return React.cloneElement(elem, {...props, onClick: this.onClick});
  }
});
