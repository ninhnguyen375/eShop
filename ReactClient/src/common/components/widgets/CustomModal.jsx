/* eslint-disable react/jsx-props-no-spreading */
import React, { Component } from 'react';
import { Modal } from 'antd';

class CustomModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      content: '',
      options: {},
    };
    this.show = this.show.bind(this);
    this.hide = this.hide.bind(this);
    this.isVisible = this.isVisible.bind(this);
  }

  show(content, options = {}) {
    this.setState({ isShow: true, content, options });
  }

  hide() {
    this.setState({ isShow: false });
  }

  clear() {
    this.setState({ isShow: false, content: '', options: {} });
  }

  isVisible() {
    const { isShow } = this.state;
    return isShow;
  }

  render() {
    const { isShow, content, options } = this.state;

    return (
      <Modal
        visible={isShow}
        footer={null}
        onCancel={() => this.hide()}
        {...options}
        bodyStyle={{ padding: 10, ...(options.bodyStyle || {}) }}
      >
        {content}
      </Modal>
    );
  }
}
export default CustomModal;
