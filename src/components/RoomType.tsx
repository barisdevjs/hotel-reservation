import { Avatar, Card, Col, Form, Radio, Row, Divider, Space,Typography } from 'antd'
import React, { useMemo } from 'react';
import { HotelProps, RoomI } from '../utils/types';
import { Dayjs } from 'dayjs';
const { Meta } = Card;


function RoomType({ data, setData, updateFields }: HotelProps) {

    const rooms = data.room_type as RoomI[];

    console.log(data);

    function calculateDays(start: Dayjs, end: Dayjs): number {
        return end.diff(start, 'day')
    }

    const totalDays = useMemo(() => calculateDays(data.startDate, data.endDate), [data.startDate, data.endDate]);

    function calculatePrice(room: RoomI, totalDays: number, data: { parents: number, children?: number }) {
        const price = room.price * totalDays * data.parents * (data.children ?? 1);
        return new Intl.NumberFormat('tr', { style: 'currency', currency: 'TRY' }).format(price);
    }


    return (
        <Form.Item label="Room Type Selection" className='font-label' style={{marginInline:'auto'}}>
            <Radio.Group >
                <Row gutter={[64, 32]} align='top' justify='space-evenly' style={{marginInline:'auto'}}>
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
                                    <Row align='top' justify='space-between' style={{ width: '100%' }}>
                                        <Col>
                                        <Typography.Text strong>{data.parents}</Typography.Text>
                                        <Typography.Text>adults</Typography.Text> </Col>
                                        {data.children && <Col>{data.children} children</Col>}
                                        <Col>{totalDays} days</Col>
                                    </Row>
                                    <Divider dashed>Details</Divider>
                                    <Meta
                                        title={<Row justify='space-between'><Col>Total</Col > <Col>{calculatePrice(room, totalDays, { parents: data.parents, children: data.children || 0 })}</Col></Row>}
                                        description={room.description}
                                    />

                                </Card>
                            </Radio>
                        </Col>
                    )}
                </Row>
            </Radio.Group>
        </Form.Item>
    )
}

export default RoomType