import { Card, Col, Form, Radio, Row, Divider, Typography, RadioChangeEvent } from 'antd'
import { useMemo } from 'react';
import { HotelProps, RoomI } from '../utils/types';
import { ScenicI } from '../utils/types';
import { calculateDays, formatCurrency } from '../utils/helpers';
const { Meta } = Card;


function RoomType({ data, setData, updateFields }: HotelProps) {

    let rooms: RoomI[] = [];

    if (Array.isArray(data.room_type)) {
        rooms = data.room_type;
    }

    const onRoomChange = (e: RadioChangeEvent) => {
        const room = rooms.find(room => room.id === Number(e.target.value));
        const total_price = calculatePrice(room as RoomI, totalDays, { parents: data.parents, children: data.children as number, selected_scene: data.selected_scene });
        setData({ ...data, total_price: total_price });
        updateFields({ selectedRoom: room, total_price: total_price });
    };

    const totalDays = useMemo(() => calculateDays(data.startDate, data.endDate), [data.startDate, data.endDate]);

    function calculatePrice(room: RoomI, totalDays: number,
        data: { parents: number, children?: number, selected_scene: ScenicI }) {
        const price =
            room.price * totalDays * data.parents * (data.children ?? 1) * (1 + data.selected_scene.price_rate / 100);
        return price;
    }

    let scenes: ScenicI[] = [];

    if (Array.isArray(data.room_scenic)) {
        scenes = data.room_scenic;
    }

    function onSceneChange(e: RadioChangeEvent) {
        const scene = scenes.find(room => room.id === e.target.value);
        const total_price = totalDays * data.parents * (data.children ?? 1) * (1 + scene!.price_rate / 100) * data.selectedRoom.price
        setData({ ...data, total_price: total_price });
        updateFields({ selected_scene: scene });
    }

    return (
        <Row >
            <Form.Item label="Room Type Selection" className='font-label' style={{ marginInline: 'auto' }} name="selected_Room" rules={[{ required: true }]}>
                <Radio.Group onChange={onRoomChange}>
                    <Row gutter={[64, 32]} align='top' justify='space-evenly' style={{ marginInline: 'auto' }}>
                        {rooms.map((room: RoomI) =>
                            <Col key={room.id}>
                                <Radio value={room.id} >
                                    <Card title={room.title} bordered={false} size='small'
                                        style={{
                                            width: 300, boxShadow: data.selectedRoom?.id === room.id ? '0 0 5px 3px rgba(0, 0, 0, 0.2)' : 'none'
                                        }}
                                        hoverable
                                        cover={
                                            <img
                                                alt={room.title}
                                                src={room.photo}
                                            />
                                        }>
                                        <Row align='top' justify='space-between' style={{ width: '100%' }}>
                                            <Col>
                                                <Typography.Text strong>{data.parents}</Typography.Text>
                                                &nbsp;
                                                <Typography.Text type='secondary'>adults</Typography.Text> </Col>
                                            {data.children && <Col>
                                                <Typography.Text strong>{data.children}</Typography.Text>
                                                &nbsp;
                                                <Typography.Text type='secondary'>children</Typography.Text>
                                            </Col>}
                                            <Col>
                                                <Typography.Text strong>{totalDays}</Typography.Text>&nbsp;
                                                <Typography.Text type='secondary'>days</Typography.Text>
                                            </Col>
                                        </Row>
                                        <Divider dashed>Details</Divider>
                                        <Meta
                                            title={<Row justify='space-between'>
                                                <Col>Total</Col>
                                                <Col>{formatCurrency(calculatePrice(room, totalDays, { parents: data.parents, children: data.children || 1, selected_scene: data.selected_scene }))}</Col>
                                            </Row>}
                                            description={room.description}
                                        />

                                    </Card>
                                </Radio>
                            </Col>
                        )}
                    </Row>
                </Radio.Group>
            </Form.Item>
            <Form.Item label="Room Scene Selection" className='font-label' style={{ marginInline: 'auto' }} name="selected_Scene" rules={[{ required: true }]}>
                <Row gutter={[64, 32]} align='middle' justify='space-around' style={{ marginInline: 'auto' }} className='mb-12'>
                    <Radio.Group onChange={onSceneChange} buttonStyle="solid"
                        defaultValue={data.selected_scene.id} className='flex'>
                        {scenes.map((scene: ScenicI) =>
                            <Radio.Button key={scene.id} value={scene.id}>
                                <h5 style={{ display: 'flex', justifyContent: 'center' }}>
                                    {scene.title}
                                </h5>
                                <Typography.Text>
                                    Affection Rate &nbsp;  {scene.price_rate}%
                                </Typography.Text>
                            </Radio.Button>
                        )}
                    </Radio.Group>
                </Row>
            </Form.Item >
        </Row>
    )
}

export default RoomType