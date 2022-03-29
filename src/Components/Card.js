import chip from '../images/chip.svg';
import visa from '../images/visa-logo@logotyp.us.svg';

const Card = ({cardNumber, fullName, month, year, css}) => {
    let cardinal = '#### #### #### ### #';

    const receiveCardNumber = !cardNumber.length ? cardinal : handleCardNumber();
    const receiveFullName = !fullName.length ? 'full name' : fullName;
    const expire = !month.length && !year.length ? 'mm/yy' : handleExpiration();
    
    function handleCardNumber(){
        let numbersLeft = 17 - cardNumber.length;

        if (cardNumber.length <= 16) {
            let output = cardNumber + '#'.repeat(numbersLeft)
            cardinal = output.replace(/^(.{4})(.{4})(.{4})(.{3})(.{1})(.*)$/, "$1 $2 $3 $4 $5");
            return cardinal
        }else{
            cardinal = cardNumber.replace(/^(.{4})(.{4})(.{4})(.{3})(.{1})(.*)$/, "$1 $2 $3 $4 $5");
            return cardinal
        }
    }
    
    function handleExpiration(){
        let mm = month.length ? month : 'mm';
        let yy = year.length ? year : 'yy';
        return `${mm}/${yy}`
    }

  return (
    <div className={`card-wrapper ${css}`}>
        <header>
            <img src={chip} alt="chip" className='chip' />
            <img src={visa} alt="visa" className='visa' />
        </header>
        <article className='card-number'>
            <h1>{receiveCardNumber}</h1>
        </article>
        <article className='card-information'>
            <article>
                <p>Card Holder</p>
                <p>{receiveFullName}</p>
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