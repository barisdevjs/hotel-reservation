import { Row, Col, InputNumber } from "antd"
import { Form, Select } from 'antd';
import { useGetHotelList } from "./Services";
import { DatePicker } from 'antd';
import * as dayjs from 'dayjs'
import { FormT } from "./utils/types";

const { Option } = Select;

interface HotelAndDateProps {
  data: FormT;
  setData: React.Dispatch<React.SetStateAction<FormT>>;
  updateFields: (fields: Partial<FormT>) => void;
}

function HotelAndDate({ data, setData, updateFields }: HotelAndDateProps) {
  const { hotelListLoading, hotels } = useGetHotelList();


  const onStartDateChange = (date: any, dateString: string) => {
    setData((prev: any) => ({ ...prev, startDate: dayjs(date) }));
  };

  const onEndDateChange = (date: any, dateString: string) => {
    setData((prev: any) => ({ ...prev, endDate: dayjs(date) }));
  };


  return (
    <Row gutter={[32, 32]} justify="space-between">
      <Col>
        <Form.Item
          name="hotel_name"
          label="Select Hotel"
          rules={[{ required: true }]}
        >
          <Select
            placeholder="Please Select Your Hotel From Options"
            onChange={(value) =>
              updateFields({ hotel_name: value.split('|')[0], id: value.split('|')[1] })
            }
            allowClear
          >
            {!hotelListLoading &&
              hotels.map((hotel) => (
                <Option key={hotel.id} value={`${hotel.hotel_name}|${hotel.id}`}>
                  {hotel.hotel_name}
                </Option>
              ))}
          </Select>
        </Form.Item>
      </Col>
      <Col >
        <Form.Item name="startDate" label="Start Date" rules={[{ required: true }]}>
          <DatePicker value={dayjs(data.startDate)} onChange={onStartDateChange} placeholder="Start Date" />
        </Form.Item>
      </Col>
      <Col >
        <Form.Item name="endDate" label="End Date" rules={[{ required: true }]}>
          <DatePicker value={dayjs(data.endDate)} onChange={onEndDateChange} placeholder="End Date" />
        </Form.Item>
      </Col>
      <Col>
        <Form.Item name='max_adult_size' label="Parents" rules={[{ required: true }]}>
          <InputNumber min={1} max={3} onChange={(value) => updateFields({ max_adult_size: value as number })} />
        </Form.Item>
      </Col>
      <Col>
        <Form.Item name='children' label="Children"  >
          <InputNumber min={1} max={3} onChange={(value) => updateFields({ children: value as number })} />
        </Form.Item>
      </Col>
    </Row>
  )
}

export default HotelAndDate;