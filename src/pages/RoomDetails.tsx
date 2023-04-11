import { Row, Col, Typography, Space } from "antd"
import { FormT, HotelProps } from "../utils/types";
import '../App.css';
import RoomType from "../components/RoomType";


function RoomDetails({ data, setData, updateFields }: HotelProps) {

  function updateForm(fields: Partial<FormT>): void {
    setData(prev => {
      return { ...prev, ...fields }
    })
  }

  return (
    <Space direction="vertical" size="large" className="flex justify-center items-stretch">
      <Row gutter={[32, 32]} align='bottom' justify='space-around' className="customRow" >
        <Col>
          <Typography.Title level={5}>{data.hotel_name}</Typography.Title>
          <Typography.Text>{data.city}</Typography.Text>
        </Col>
        <Col >
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
        {(data.child_status && data.children as number > 0) &&
          <Col>
            <Typography.Title level={5}>Children</Typography.Title>
            <Typography.Text>{data.children}</Typography.Text>
          </Col>
        }
      </Row>
        <RoomType data={data} setData={setData} updateFields={updateForm} />
    </Space>
  )
}

export default RoomDetails