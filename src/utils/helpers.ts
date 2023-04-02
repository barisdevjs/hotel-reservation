import { Dayjs } from 'dayjs';


export function formatCurrency(num: number): string {
    return new Intl.NumberFormat('tr', { style: 'currency', currency: 'TRY' }).format(num);
} 

export  function calculateDays(start: Dayjs, end: Dayjs): number {
    return end.diff(start, 'day')
}