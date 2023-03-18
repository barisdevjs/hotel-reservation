import HotelAndDate from "./HotelAndDate";
import { Steps, message,Form } from 'antd'
import Button from 'antd/es/button';
import RoomDetails from "./RoomDetails";
import Payment from "./Payment";
import './index.css'
import { useNavigation } from "./useNavigation";

export type FormT = {
    firstName: string
    lastName: string
    age: number
    street: string
    city: string
    state: string
    zip: string
    email: string
    password: string
  }
  
  const initialData: FormT = {
    firstName: "",
    lastName: "",
    age: 0,
    street: "",
    city: "",
    state: "",
    zip: "",
    email: "",
    password: "",
  }

const INITIAL_STEPS = [
    {
        title: 'Hotel And Date Selection',
        content: <HotelAndDate />,
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

function Navigation() {
    const { current, step, steps, next, prev, goTo, isFirstStep, isLastStep } = useNavigation(INITIAL_STEPS)
    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    return (
        <div className=" mx-auto flex max-w-7xl  p-6 lg:px-8" style={{flexDirection:'column'}}>
            <Steps current={current} items={items} labelPlacement='vertical'></Steps>
            <Form layout="vertical">
                {steps[current].content}
            </Form>
            <div className="flex items-center justify-between">
                {!isFirstStep && (
                    <Button type="primary" onClick={prev}> Previous</Button>
                )}
                {current < steps.length - 1 && (
                    <Button type="primary"  onClick={next}>Next</Button>
                )}
                {isLastStep && (
                    <Button  type="primary" onClick={() => message.success('Processing complete!')}>
                        Done
                    </Button>
                )}
            </div>
        </div>
    )
}

export default Navigation