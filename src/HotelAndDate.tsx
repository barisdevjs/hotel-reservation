import { Row, Col, Typography } from "antd"
import { Button, Form, Input, Select } from 'antd';
import { useState } from "react";
import { HotelI, useGetHotelList } from "./Services";
const { Option } = Select;



function HotelAndDate() {
  const { hotelListLoading, hotels } = useGetHotelList();

  return (
      <Row gutter={[32,32]}>
      <Col>
        <Form.Item name="hotel" rules={[{ required: true }]}>
          <Select
            placeholder="Please Select Your Hotel From Options"
            onChange={() => console.log('DSDS')}
            allowClear
          >
          {!hotelListLoading && hotels.map((hotel) => (
              <Option key={hotel.id} value={hotel.id}>
                {hotel.hotel_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>

      <Col >
        <p>22222222222222222222</p>
      </Col>
      <Col >
        <p>33333333333333333</p>
      </Col>
      </Row>
  )
}

export default HotelAndDate;