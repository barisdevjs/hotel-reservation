import React from 'react';
import { ResultModalI } from '../utils/types';
import { Modal } from 'antd';

function Result({ title, visible, handleOk, handleCancel }: any) {
    return (
      <Modal
        title={title}
        open={visible}
        onOk={handleOk}
      >
        <p>Some contents...</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    );
  }
  

export default Result;
