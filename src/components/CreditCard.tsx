import React from 'react';
import { Avatar, Card, Col, Row, Space, Typography } from 'antd';
import { FormT } from '../utils/types';
import { useSessionStorage } from '../services/useSessionStorage';
import '../index.css';
import './cred.css';
import visaCard from '../assets/Visa-Payment-Card.svg'
import creditCardChip from '../assets/credit-card-chip.svg';
import logo from '../assets/logo.jpg';

interface CardI {
  digits: string
  expires: string
  name: string
}

export const initialCart: CardI = { digits: '0000000000000000', expires: 'XXXX', name: 'YOUR NAME' };


function CreditCard({ data }: { data: FormT }) {
  const [cardState, setCardState] = useSessionStorage('cartData', initialCart);


  function formatCard(str: string): string {
    if (/^\d{4}(\s\d{4}){3}$/.test(str)) {
      return str;
    }
    return str.replace(/\s/g, '').match(/.{1,4}/g)!.join(' ');

  }

  function formatFirstFour(str: string): string {
    if (/^\d{2}\/\d{2}$/.test(str)) {
      return str;
    }
    return str.replace(/^(\d{2})(\d{2})/, '$1/$2');

  }


  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const unformattedValue = e.target.value.replace(/\s/g, '').slice(0, 16);
    setCardState(prev => ({
      ...prev,
      digits: unformattedValue,
    }));
  }

  function handleBlur() {
    setCardState(prev => ({
      ...prev,
      digits: formatCard(prev.digits),
    }));
  }

  function handleExpiresBlur() {
    setCardState(prev => ({
      ...prev, expires: formatFirstFour(prev.expires)
    }))
  }

  return (
    <div className="credit-card">
      <div className="aa">1</div>
      <div className="bb">2</div>
      <div className="cc">3</div>
      <div className="dd">4</div>
      <div className="ee">5</div>
    </div>
  );
  
  
}

export default CreditCard;