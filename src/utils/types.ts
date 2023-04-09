import  { Dayjs } from 'dayjs';


export interface HotelListI  {
    id: string,
    hotel_name: string
}

export interface RoomI {
    id:number,
    title: string,
    description: string,
    photo:string,
    price:number
}

export const initialRoom = {
    id: 0,
    title: '',
    description: '',
    photo: '',
    price:0
}

export interface ScenicI  {
    id:number,
    title: string,
    photo:string,
    price_rate:number
}

export const initialScenic = {
    id: 0,
    title: '',
    photo: '',
    price_rate:0
}

export type FormT = {
    id: string
    parents: number
    hotel_id:number
    hotel_name: string
    startDate: Dayjs
    endDate: Dayjs
    max_adult_size: number
    child_status: boolean
    children?:number | null
    city?: string
    possibilities?: string[]
    room_type: RoomI | RoomI[]
    room_scenic: ScenicI | ScenicI[]
    selectedRoom : RoomI
    selected_scene : ScenicI
    total_price: number
  }

export type HotelT = {
    id: string,
    hotel_id :number,
    city: string,
    possibilities: string[],
    max_adult_size: number,
    child_status: boolean,
    room_type:RoomI,
    room_scenic : ScenicI
  }

  export const initialHotel = {
    id: '',
    hotel_id: 0,
    city: '',
    possibilities:[],
    max_adult_size:0,
    child_status: false,
    room_type: initialRoom,
    room_scenic: initialScenic
  }


  export interface HotelProps {
    data: FormT;
    setData: React.Dispatch<React.SetStateAction<FormT>>;
    updateFields: (fields: Partial<FormT>) => void;
  }

  export interface ResultModalI {
    open: boolean;
    handleOk: () => void;
    handleCancel: () => void; 
  }

  export type ErrorFields<T = any> = {
    errorFields: Array<{
        name: Array<string>,
        errors: Array<string>,
        warnings: Array<string>
    }>,
    outOfDate: boolean,
    values: {
        [key: string]: T | undefined
    }
}