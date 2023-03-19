import { Row, Col, InputNumber } from "antd"
import { Form, Select } from 'antd';
import { useGetHotelList } from "./Services";
const { Option } = Select;
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';
import locale from 'antd/es/date-picker/locale/tr_TR';

function HotelAndDate({ data, setData, updateFields }: { data: any, setData: any, updateFields: any }) {
  const { hotelListLoading, hotels } = useGetHotelList();
  return (
    <Row gutter={[32, 32]} justify="space-between">
      <Col>
        <Form.Item name="hotel_name" label="Select Hotel" rules={[{ required: true }]}>
          <Select
            placeholder="Please Select Your Hotel From Options"
            onChange={(value) => updateFields({ hotel_name: value })}
            allowClear
          >
            {!hotelListLoading && hotels.map((hotel) => (
              <Option key={hotel.id} value={hotel.hotel_name}>
                {hotel.hotel_name}
              </Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
      <Col >
        <Form.Item name="startDate" label="Start Date" rules={[{ required: true }]}>
          <DatePicker  format="YYYY-MM-DD" onChange={(date,dateString) => date && updateFields({ startDate:  date.toISOString()})} placeholder="Start Date" />
        </Form.Item>
      </Col>
      {/* <Col >
         <Form.Item name="endDate" label="End Date" rules={[{ required: true }]}>
           <DatePicker onChange={value => updateFields({ endDate:  dayjs(value)?.format('YYYY-MM-DD') })} placeholder="End Date" />
         </Form.Item>
       </Col> */}
      <Col>
        <Form.Item name='parents' label="Parents" rules={[{ required: true }]}>
          <InputNumber min={1} max={3} onChange={(value) => updateFields({ parents: value })} />
        </Form.Item>
      </Col>
      <Col>
        <Form.Item name='children' label="Children"  >
          <InputNumber min={1} max={3} onChange={(value) => updateFields({ children: value })} />
        </Form.Item>
      </Col>
    </Row>
  )
}

export default HotelAndDate;