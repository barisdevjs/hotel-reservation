import React from 'react';
import { Card } from 'antd';
import { FormT } from '../utils/types';
import { useSessionStorage } from '../services/useSessionStorage';
import '../index.css';
import './Card.css';
import visaCard from '../assets/Visa-Payment-Card.svg'
import creditCardChip from '../assets/credit-card-chip.svg';

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
    <Card size='small' style={{ border: 'none' }} >
      <div className="credit-card-wrap">
        <div className="mk-icon-world-map"></div>
        <div className="credit-card-inner">
          <header className="header">
            <div className="credit-logo">
              <div className="shape"><span className="txt">PB</span></div> <span className="text">Public Bank of Turkey</span>
            </div>
          </header>
          <div className="mk-icon-sim flex items-center"><img src={creditCardChip} width='100%' /></div>
          <div className="credit-font credit-card-number" data-text={cardState.digits.slice(0, 4)}>
            <input value={cardState.digits} type='text' max={16} onChange={handleChange} onBlur={handleBlur} />
          </div>
          <footer className="footer">
            <div className="clearfix">
              <div className="pull-left">
                <div className="credit-card-date">
                  <span className="title">Expires End</span>
                  <input className='expires-input' value={cardState.expires}
                    onChange={(e) => setCardState({ ...cardState, expires: e.target.value.replace(/\s/g, '').slice(0, 4) })} onBlur={handleExpiresBlur} />
                </div>
                <input className="credit-font credit-author" value={cardState.name.toLocaleUpperCase()}
                  onChange={(e) => setCardState({ ...cardState, name: e.target.value.toLocaleUpperCase() })} />
              </div>
              <div className="pull-right">
                <div className="mk-icon-visa"><img src={visaCard} width='100%' /></div>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </Card>
  )
}

export default CreditCard;