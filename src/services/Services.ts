import { useCallback, useEffect, useState } from "react";
import { FormT, HotelListI, HotelT, initialHotel } from "../utils/types";

const HOTELLIST = 'https://628e2457a339dfef87a85d4e.mockapi.io/havascx/hotels';
const HOTELDETAILS = 'https://628e2457a339dfef87a85d4e.mockapi.io/havascx/hotel-details';
const PUTHOTEL = 'https://628e2457a339dfef87a85d4e.mockapi.io/havascx/hotel-bookings';
const DELETEHOTEL = 'https://628e2457a339dfef87a85d4e.mockapi.io/havascx/hotel-bookings/%7BID%7D'; // ??
const COUPONS = 'https://628e2457a339dfef87a85d4e.mockapi.io/havascx/coupons';
const GETCOUPON = 'https://628e2457a339dfef87a85d4e.mockapi.io/havascx/coupons?code={CODE}' // CODE20



export function useGetHotelList() {
    const [hotelListLoading, setHotelListLoading] = useState(false);
    const [hotelList, setHotelList] = useState<HotelListI[]>([]);

    const getHotelList = useCallback(async () => {
        try {
            const result = await fetch(HOTELLIST);
            const data = await result.json();
            setHotelList(data);
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

    return { hotelListLoading, hotelList };
}

export function useGetHotelById() {
    const [hotelLoading, setHotelLoading] = useState(false);
    const [hotel, setHotel] = useState<HotelT>(initialHotel);

    const getHotel = useCallback(async (id: string) => {
        try {
            setHotelLoading(true);
            const result = await fetch(HOTELDETAILS);
            const data = await result.json();
            setHotel(data.find((hotel: HotelT) => hotel.id === id));

        } catch (error) {
            console.log(error);
        } finally {
            setHotelLoading(false);
        }
    }, [])

    return { hotelLoading, hotel, getHotel };
}