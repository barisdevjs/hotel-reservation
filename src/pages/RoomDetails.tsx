import { Row, Col, InputNumber, Typography } from "antd"
import { Form, Select } from 'antd';
import { useGetHotelList } from "../services/Services";
import { DatePicker } from 'antd';
import * as dayjs from 'dayjs'
import { FormT, HotelProps } from "../utils/types";
import { Dayjs } from 'dayjs';
import '../App.css';


function RoomDetails({ data, setData, updateFields }: HotelProps) {

  console.log(data)
  return (
    <Row gutter={[32,32]} align='bottom' justify='space-around' className="customRow">
      <Col>
        <Typography.Title level={5}>{data.hotel_name}</Typography.Title>
        <Typography.Text>{data.city}</Typography.Text>
      </Col>
      <Col>
        <Typography.Title level={5}>Start Date</Typography.Title>
        <Typography.Text>{data.startDate.format('DD MMMM YYYY')}</Typography.Text>
      </Col>
      <Col>
        <Typography.Title level={5}>End Date</Typography.Title>
        <Typography.Text>{data.endDate.format('DD MMMM YYYY')}</Typography.Text>
      </Col>
      <Col>
      <Typography.Title level={5}>Adults</Typography.Title>
        <Typography.Text>{data.parents}</Typography.Text>
      </Col>
      <Col>
      <Typography.Title level={5}>Children</Typography.Title>
        <Typography.Text>{data.children}</Typography.Text>
      </Col>
    </Row>
  )
}

export default RoomDetails