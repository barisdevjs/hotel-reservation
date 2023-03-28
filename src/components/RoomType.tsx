import { Avatar, Card, Col, Form, Radio, Row, Space } from 'antd'
import React from 'react';
import { HotelProps, RoomI } from '../utils/types';
const { Meta } = Card;

function RoomType({ data, setData, updateFields }: HotelProps) {

    const rooms = data.room_type as RoomI[];

    return (
        <Form.Item label="Room Type Selection">
            <Radio.Group >
                <Row gutter={[32, 32]} align='top' justify='space-between'>
                    {rooms.map((room) =>
                        <Col key={room.id}>
                            <Radio value={room.id}>
                                <Card title={room.title} bordered={false} size='small'
                                    style={{ width: 300 }} hoverable 
                                    cover={
                                      <img
                                        alt={room.title}
                                        src={room.photo}
                                      />
                                    }>
                                    <Row>
                                        <Col>{data.parents} adults</Col>
                                        {data.children && <Col>{data.children} children</Col>}
                                    </Row> 
                                    <Meta
                                        title={room.price}
                                        description={room.description}
                                    />
                                </Card>
                            </Radio>
                        </Col>
                    )}
                    {/* <Col>
                        <Radio value="pear"> <Card title="Card title" bordered={false}>Pear </Card></Radio>
                    </Col>
                    <Col>
                        <Radio value="sasa"> <Card title="Card title" bordered={false}>Sasa </Card></Radio>
                    </Col> */}
                </Row>
            </Radio.Group>
        </Form.Item>
    )
}

export default RoomType