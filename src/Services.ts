import { useCallback, useEffect, useState } from "react";

const HOTELLIST = 'https://628e2457a339dfef87a85d4e.mockapi.io/havascx/hotels';
const HOTELDETAILS = 'https://628e2457a339dfef87a85d4e.mockapi.io/havascx/hotel-details'
const PUTHOTEL = 'https://628e2457a339dfef87a85d4e.mockapi.io/havascx/hotel-bookings' // ??
const DELETEHOTEL = 'https://628e2457a339dfef87a85d4e.mockapi.io/havascx/hotel-bookings/%7BID%7D' // ??


export interface HotelI  {
    id: string,
    hotel_name: string
}

export function useGetHotelList() {
    const [hotelListLoading, setHotelListLoading] = useState(false);
    const [hotels, setHotels] =  useState<HotelI[]>([]);

    const getHotelList = useCallback(async () => {
        try {
            const result = await fetch(HOTELLIST);
            const data = await result.json();
            setHotels(data);
        } catch (error) {
            console.log(error);
        } finally {
            setHotelListLoading(false);
        }

    }, [])

    useEffect(() => {
        setHotelListLoading(true);
        getHotelList();
    }, [getHotelList]);

    return {hotelListLoading, hotels};
}