import { Row, Col, InputNumber, Button } from "antd"
import { Form, Select } from 'antd';
import { useGetHotelList } from "../services/Services";
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import { HotelProps } from "../utils/types";
import { Dayjs } from 'dayjs';


const { Option } = Select;

function HotelAndDate({ data, setData, updateFields }: HotelProps) {
  const { hotelListLoading, hotelList } = useGetHotelList();


  const onDateChange = (fieldName: string, date: Dayjs) => {
    setData(prev => ({ ...prev, [fieldName]: dayjs(date), }));
  };


  return (
    <Row gutter={[32, 32]} justify="space-between">
      <Col >
        <Form.Item
          style={{ minWidth: '10rem' }}
          name="hotel_name"
          label="Select Hotel"
          rules={[
            { required: true },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (value && value.trim()) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Please select a hotel'));
              },
            }),
          ]}
        >
          <Select
            placeholder="Please Select Your Hotel From Options"
            onChange={(value) =>
              updateFields({ hotel_name: value?.split('|')[0], id: value?.split('|')[1] })
            }
            allowClear
          >
            {!hotelListLoading &&
              hotelList.map((hotel) => (
                <Option key={hotel.id} value={`${hotel.hotel_name}|${hotel.id}`}>
                  {hotel.hotel_name}
                </Option>
              ))}
          </Select>
        </Form.Item>
      </Col>
      <Col>
        <Form.Item name="startDate" label="Start Date" rules={[{ required: true }]} >
                      <DatePicker value={dayjs(data.startDate)} placeholder="Start Date"
            onChange={(date, dateString) => onDateChange('startDate', dayjs(dateString))} />
        </Form.Item>
      </Col>
      <Col >
        <Form.Item name="endDate" label="End Date" rules={[{ required: true }]}>
          <DatePicker value={dayjs(data.endDate)} placeholder="End Date"
            onChange={(date, dateString) => onDateChange('endDate', dayjs(dateString))} />
        </Form.Item>
      </Col>
      <Col>
        <Form.Item name='parents' label="Parents"
          rules={[{ required: true }, { type: 'number', max: data.max_adult_size, message: `${data.hotel_name} can not accept more than ${data.max_adult_size} adults` }]}>
          <InputNumber min={1} onChange={(value) => updateFields({ parents: value as number })} />
        </Form.Item>
      </Col>
      <Col>
        <Form.Item name='children' label="Children" rules={[{ type: 'number', min: 0, max: 4 }]} >
          <InputNumber disabled={!data.child_status} onChange={(value) => updateFields({ children: value as number })} />
        </Form.Item>
      </Col>
    </Row>
  )
}

export default HotelAndDate;