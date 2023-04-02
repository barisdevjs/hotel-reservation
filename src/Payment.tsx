import React, { useMemo } from 'react'
import { HotelProps } from './utils/types';
import { Card, Col, Row, Typography } from 'antd';
import './App.css';
import './index.css';
import { calculateDays, formatCurrency } from './utils/helpers';

const topCard: React.CSSProperties = {
  width: '33.333%',
  textAlign: 'center',
  padding:'.25rem',
};

const bottomCard: React.CSSProperties = {
  display: 'flex',
  width: '100%',
  textAlign: 'center',
  padding:'.5rem 1rem',
  justifyContent:'space-between',
}

function Payment({ data, setData, updateFields }: HotelProps) {

  const totalDays = useMemo(() => calculateDays(data.startDate, data.endDate), [data.startDate, data.endDate]);

  const title = <Row gutter={[32,8]} align='stretch' justify='center'>
    <Col>
      <Typography.Title level={5}>{data.hotel_name}</Typography.Title>
    </Col>
    <Col>
      <Typography.Text type="secondary">({data.city})</Typography.Text>
    </Col>
  </Row>
  return (
    <Row className="m-4" gutter={[32, 32]} align='middle' justify='space-between'>
      <Col style={{ border: '1px solid green' }}>sdsd</Col>
      <Col style={{ border: '1px solid red' }}>
        <Row>
          <Card title={title} size='small'>
            <Card.Grid style={topCard}>
              <Typography.Text strong >Start Date</Typography.Text>
              <Typography>{data.startDate.format('DD MMMM YYYY')}</Typography>
            </Card.Grid>
            <Card.Grid style={topCard}>
              <Typography.Text strong>End Date</Typography.Text>
              <Typography>{data.endDate.format('DD MMMM YYYY')}</Typography>
            </Card.Grid>            
            <Card.Grid style={topCard}>
              <Typography.Text strong>Adults</Typography.Text>
              <Typography>{data.parents}</Typography>
            </Card.Grid>
            <Card.Grid style={topCard}>
              <Typography.Text strong>Children</Typography.Text>
              <Typography>{data.children || 0}</Typography>
            </Card.Grid>
            <Card.Grid style={topCard}>
              <Typography.Text strong>Room Type</Typography.Text>
              <Typography>{data.selectedRoom.title}</Typography>
            </Card.Grid>            
            <Card.Grid style={topCard}>
              <Typography.Text strong>Room Scene </Typography.Text>
              <Typography>{data.selected_scene.title}</Typography>
            </Card.Grid>
          </Card>
        </Row>

        <Row className="mt-2 ">
          <Card size='small' className='w-auto' >
            <Card.Grid style={bottomCard} className='flex justify-between'>
              <Typography.Text strong >Room Price</Typography.Text>
              <Typography>{data.selectedRoom.price}</Typography>
            </Card.Grid>
            <Card.Grid style={bottomCard} className='flex justify-between'>
              <Typography.Text strong >Room Type</Typography.Text>
              <Typography>{data.selectedRoom.title}</Typography>
            </Card.Grid>
            <Card.Grid style={bottomCard} className='flex justify-between'>
              <Typography.Text strong >Room Scene</Typography.Text>
              <Typography>{data.selected_scene.price_rate} %</Typography>
            </Card.Grid>
            <Card.Grid style={bottomCard} className='flex justify-between'>
              <Typography.Text strong >Total Days</Typography.Text>
              <Typography>{totalDays}</Typography>
            </Card.Grid>
            <Card.Grid style={bottomCard} className='flex justify-between'>
              <Typography.Text strong >Total </Typography.Text>
              <Typography>{formatCurrency(data.total_price)}</Typography>
            </Card.Grid>
          </Card>
        </Row>
      </Col>
    </Row>
  )
}

export default Payment