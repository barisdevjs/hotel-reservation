import {  ResultModalI } from '../utils/types';
import { Button, Modal, Result } from 'antd';


function ResultPage({ open, handleOk, handleCancel }: ResultModalI ) {
  return (
    <Modal
      title="Reservation Details"
      open={open}
      onOk={handleOk}
      onCancel={handleCancel}
      footer={[
        <Button key="back" onClick={handleCancel}>
          Update
        </Button>,
        <Button key="delete" danger  htmlType='button' onClick={handleOk}>
          Delete
        </Button>,
        <Button
          key="new"
          onClick={handleOk}
          ghost={true}
        >
          Book a new one
        </Button>,
      ]}
    >
      <p>Your reservation details on the page.</p>
      <p>You can update,delete or make a new reservation via the links below.</p>
      <Result
        status="success"
        title="Successfully Booked Your Reservation"
        subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
      />
    </Modal>
  );
}

export default ResultPage;
