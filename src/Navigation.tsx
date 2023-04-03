import HotelAndDate from "./pages/HotelAndDate";
import { Steps, message, Form, Typography } from 'antd'
import Button from 'antd/es/button';
import RoomDetails from "./pages/RoomDetails";
import Payment from "./pages/Payment";
import './index.css';
import { useNavigation } from "./useNavigation";
import { useEffect, useState } from "react";
import { useSessionStorage } from "./useSessionStorage";
import dayjs, { Dayjs } from 'dayjs';
import { FormT, initialRoom, initialScenic } from "./utils/types";
import { useGetHotelById } from "./services/Services";


const initialData: FormT = JSON.parse(sessionStorage.getItem('formData') as string) || {
    id:'',
    hotel_name: '',
    hotel_id:0,
    startDate: dayjs(),
    endDate: dayjs().add(2, 'day'),
    max_adult_size: 0,
    child_status:false,
    children: null,
    parents:0,
    city:'',
    possibilities:[],
    room_type:[],
    room_scenic:[],
    selected_scene: initialScenic,
    selectedRoom:initialRoom,
    total_price:0
};


initialData.startDate = dayjs(initialData?.startDate);
initialData.endDate = dayjs(initialData?.endDate);

function Navigation() {
    const [data, setData] = useSessionStorage('formData',initialData);
    const { hotelLoading, hotel, getHotel } = useGetHotelById();
    const [form] = Form.useForm();

    useEffect(() => {
        const storedData = JSON.parse(sessionStorage.getItem('formData') as string);
          storedData.startDate = dayjs(storedData?.startDate);
          storedData.endDate = dayjs(storedData?.endDate);
            setData(storedData || initialData);
      }, []);

      useEffect(() => {
        data.id &&
        getHotel(data.id)
      }, [data.id,getHotel])

      useEffect(() => {
        if (hotel.id) {
            const { hotel_id, child_status, city, possibilities, max_adult_size, room_type, room_scenic} = hotel;
            const newData = {
                ...data,
                child_status,
                city,
                hotel_id: hotel_id,
                possibilities:possibilities,
                max_adult_size:max_adult_size,
                room_type:room_type,
                room_scenic:room_scenic,
            }
            setData(newData);
            if ( newData.child_status === false) {
                message.warning('This Hotel is not accepting childrens')
            }
        }
      },[hotel.id])

    //   console.log(hotel);

    const onFinish = async () => {
        const values = await form.validateFields();
        console.log(values);
    }

    var INITIAL_STEPS = [
        {
            title: <Typography.Title level={5}>Hotel And Date</Typography.Title >,
            content: <HotelAndDate data={data} setData={setData} updateFields={updateForm} />,
        },
        {
            title:<Typography.Title level={5}>Room Details</Typography.Title >,
            content: <RoomDetails data={data} setData={setData} updateFields={updateForm}/>,
        },
        {
            title:<Typography.Title level={5}>Payment</Typography.Title >,
            content: <Payment data={data} setData={setData} updateFields={updateForm} />,
        },
    ];

    const { current, step, steps, next, prev, goTo, isFirstStep, isLastStep } = useNavigation(INITIAL_STEPS)
    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    function updateForm(fields: Partial<FormT>): void {
        setData(prev => {
            return { ...prev, ...fields }
        })
    }

    function handlePreviousClick() {
        prev();
    }

    return (
        <div className=" mx-auto flex max-w-7xl  p-6 lg:px-8" style={{ flexDirection: 'column', rowGap: '2rem' }}>
            <Steps current={current} items={items} labelPlacement='vertical'></Steps>
            <Form layout="vertical" initialValues={initialData} onFinish={onFinish} >
                {steps[current].content}
            </Form>
            <div className="flex items-center justify-between">
                {!isFirstStep && (
                    <Button type="primary" htmlType="button" onClick={handlePreviousClick}> Previous</Button>
                )}
                {current < steps.length - 1 && (
                    <Button type="primary" htmlType="button" onClick={next}>Next</Button>
                )}
                {isLastStep && (
                    <Button type="primary" htmlType="submit" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
            </div>
        </div>
    )
}

export default Navigation