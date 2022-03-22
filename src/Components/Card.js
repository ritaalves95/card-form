import { useState } from 'react';
import chip from '../images/icons8-chip-card-48.png';
import visa from '../images/visa-logo@logotyp.us.svg';

const Card = () => {
    const [cardNumber, setCardNumber] = useState('#### #### #### ');
    const [fullName, setFullName] = useState('full name');
    const [expire, setExpire] = useState('mm/yy');
    
  return (
    <div className='card-wrapper'>
        <header>
            <img src={chip} alt="chip" />
            <img src={visa} alt="visa" />
        </header>
        <article className='card-number'>{cardNumber}</article>
        <article className='card-information'>
            <article>
                <p>Card Holder</p>
                <p>{fullName}</p>
            </article>
            <article>
                <p>Expires</p>
                <p>{expire}</p>
            </article>
        </article>
    </div>
  )
}

export default Card