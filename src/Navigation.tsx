import HotelAndDate from "./HotelAndDate";
import { Steps, message, Form } from 'antd'
import Button from 'antd/es/button';
import RoomDetails from "./RoomDetails";
import Payment from "./Payment";
import './index.css'
import { useNavigation } from "./useNavigation";
import { useEffect, useState } from "react";
import { useSessionStorage } from "./useSessionStorage";
import dayjs, { Dayjs } from 'dayjs';

export type FormT = {
    hotel_name: string
    startDate: Dayjs
    endDate?: Dayjs
    parents: number
    children: number
  }


const initialData: FormT = JSON.parse(sessionStorage.getItem('formData') as string) || {
    hotel_name: '',
    startDate: dayjs(),
    endDate: dayjs().add(2,'day'),
    parents: 1,
    children: 0
};

initialData.startDate = dayjs(initialData?.startDate)

function Navigation() {
    const [data, setData] = useSessionStorage('formData',initialData);
    const [form] = Form.useForm();
    useEffect(() => {
        const storedData = JSON.parse(sessionStorage.getItem('formData') as string);
        if (storedData?.startDate) {
          storedData.startDate = dayjs(storedData.startDate);
          setData(storedData);
        }
      }, []);

    // useEffect(() => {
    //     setData(prevData => ({
    //         ...prevData,
    //         startDate: dayjs(prevData.startDate),
    //       }));
    // }, [data.startDate]);
      
      
    console.log('SSS',data);
    const onFinish = async () => {
        const values = await form.validateFields();
        console.log(values);
    }


    var INITIAL_STEPS = [
        {
            title: 'Hotel And Date',
            content: <HotelAndDate data={data} setData={setData} updateFields={updateForm} />,
        },
        {
            title: 'Room Details',
            content: <RoomDetails />,
        },
        {
            title: 'Payment',
            content: <Payment />,
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