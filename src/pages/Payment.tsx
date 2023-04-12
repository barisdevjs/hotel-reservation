import React, { useMemo } from 'react'
import { HotelProps } from '../utils/types';
import { Card, Col, Row, Typography, Watermark } from 'antd';
import { calculateDays, formatCurrency } from '../utils/helpers';
import '../App.css';
import '../index.css';
import CreditCard from '../components/CreditCard';

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

  const title = <Row gutter={[32,8]} align='middle' justify='center'>
    <Col>
      <Typography.Text strong>{data.hotel_name}</Typography.Text>
    </Col>
    <Col>
      <Typography.Text type="secondary">({data.city})</Typography.Text>
    </Col>
  </Row>


  return (
    <Watermark content="Hotel SkyKing">
    <Row gutter={[32, 16]} align='top' justify='center'>
      <Col md={12} lg={12} xl={12}>
        <CreditCard data={data} />
      </Col>
      <Col md={18} lg={12} xl={12} >
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

          <Card size='small' className='mt-2'>
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
              <Typography>% {data.selected_scene.price_rate} </Typography>
            </Card.Grid>
            <Card.Grid style={bottomCard} className='flex justify-between'>
              <Typography.Text strong >Total Days</Typography.Text>
              <Typography>{totalDays}</Typography>
            </Card.Grid>
            <Card.Grid style={bottomCard} className='flex justify-between'>
              <Typography.Text strong >Total </Typography.Text>
              <Typography.Text strong>{formatCurrency(data.total_price)}</Typography.Text>
            </Card.Grid>
          </Card>
      </Col>
    </Row>
    </Watermark>
  )
}

export default Payment