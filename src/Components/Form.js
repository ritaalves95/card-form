import {useState, useRef} from 'react'
import BackCard from './BackCard'
import Card from './Card'

const Form = () => {
//  Back Card
    const [backCard, SetBackCard] = useState(false);

// Values
    const inputEl = useRef();

    const [css, setcss] = useState({
        cardNumber: '',
        cardHolder: '',
        date: '',
        cvv: ''
    })

    const [error, setError] = useState({
        cardNumber: '',
        cardHolder: '',
        date: '',
        cvv: ''
    })

    const [values, setValues] = useState({
        cardNumber: '',
        cardHolder: '',
        month: '',
        year: '',
        cvv: ''
    })
    const { cardNumber, cardHolder, month, year, cvv } = values;

// handle change
    const handleChange = e => {
        setValues({
            ...values,
            [e.target.name]: e.target.value,
        })

        e.target.name === 'cvv' && !backCard && showBackCard();
        e.target.name !== 'cvv' && backCard && hideBackCard();
    }


//  Handle BackCard
    const showBackCard = (e) => {
        SetBackCard(true);
        setcss({...css, cvv: 'flip'})
        setTimeout(() => {
            setcss({...css, cvv: ''});
        }, 1000);                
    }

    const hideBackCard = (e) => {
        SetBackCard(false);
        setcss({...css, cvv: 'flip-out'})
        setTimeout(() => {
            setcss({...css, cvv: ''});
        }, 1000);               
    }
   
// check if input has numbers
    const isNumber = (e) => {
        let ASCIICode = (e.which) ? e.which : e.keyCode

        if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)){
            let output = e.target.id.replace(/([A-Z]+)/g, ",$1").replace(',', " ").toLowerCase();

            setErrorFor(e.target.id, `${output} must be only numbers`)
            return false;

        }else{
            setErrorFor(e.target.id, '')
            setcss({...css, [e.target.id]: ''})
            return true;
        }
    }
   
// check for string without numbers
    const isStrg = (e) => {
        let pattern = /^[A-Za-z\s]*$/;

        if(!pattern.test(e.target.value)){
            setErrorFor(e.target.id, `Card holder must be only letters`)
        }else{
            setErrorFor(e.target.id, '')
            setcss({...css, [e.target.id]: ''})
        }
    }

// handle submit
    const handleSubmit = (e) =>{
        e.preventDefault();

        for (var key in values) {
            if(!values[key].length){
                setErrorFor(key, 'This field is required');
            }else{
                checkInputs(key);
            }
        }

    }

//  check inputs
    const checkInputs = (input) => {

        if(input === 'cardNumber'){
            cardNumber.length === 16 ? setSuccessFor(input) : setErrorFor(input, 'You must have 16 numbers');
        }

        if(input === 'cardHolder'){
            cardHolder.length ? setSuccessFor(input) : setErrorFor(input, 'This field is required');
        }

        if(input === 'year'){
            let date = new Date();
            let getmonth = date.getMonth() + 1;
            let getyear = date.getFullYear().toString();

            if(( year === getyear && parseFloat(month) >= getmonth) || year !== getyear){
                setSuccessFor(input)
            }else{
                setErrorFor(input, 'Invalid date')
            }
        }

        if(input === 'cvv'){
            if(cvv.length !== 3){
                setErrorFor(input, 'You must have 3 numbers');
            }else if(isNaN(cvv)){
                setErrorFor(input, 'Must be a number');
            }else{
                setSuccessFor(input);
            }
        }

    }

// Set errors or sucesses
    const setErrorFor = (input, msg) => {
        let output = input === 'year' || input === 'month' ? 'date' : input
        let newCss = {[output]:"error"};
        let newError = {[output]: msg};
        
        setcss(css => ({...css, ...newCss }));
        setError(error => ({...error, ...newError }));
    }

    const setSuccessFor = (input) => {
        let output = input === 'year' || input === 'month' ? 'date' : input
        let newCss = {[output]:"success"};

        setcss(css => ({...css, ...newCss }));
    }

    
    return (
    <form className='card-form' onSubmit={handleSubmit}>
        <Card css={css.cvv} cardNumber={cardNumber} fullName={cardHolder} month={month} year={year} />
        {backCard && <BackCard cvv={cvv} css={css.cvv} />}
        <div className={`form-field ${css.cardNumber}`}>
            <label htmlFor="cardNumber">Card Number</label>
            <input 
                type="number" 
                value={cardNumber}
                placeholder="1234 1234 1234 333 1" 
                name="cardNumber" 
                onChange={handleChange}
                onKeyDown={isNumber}
                id="cardNumber" />
            <i className="fas fa-check-circle"></i>
            <i className="fas fa-exclamation-circle"></i>
            <small>{error.cardNumber}</small>
        </div>

        <div className={`form-field ${css.cardHolder}`}>
            <label htmlFor="cardHolder">Card Holder</label>
            <input 
                type="text" 
                value={cardHolder}
                placeholder="Alfredo Flores"
                name="cardHolder"
                onChange={handleChange}
                onKeyUp={isStrg} 
                id="cardHolder" />
            <i className="fas fa-check-circle"></i>
            <i className="fas fa-exclamation-circle"></i>
            <small>{error.cardHolder}</small>
        </div>

        <div className='form-field-wrapper'>
            <div className={`form-field ${css.date}`}>
                <label htmlFor="date">Expire Date</label>
                <article>
                    <select id="date" name="month" value={month} onChange={handleChange}>
                        <option value="" disabled>Month</option>
                        <option value="01">01</option>
                        <option value="02">02</option>
                        <option value="03">03</option>
                        <option value="04">04</option>
                        <option value="05">05</option>
                        <option value="06">06</option>
                        <option value="07">07</option>
                        <option value="08">08</option>
                        <option value="09">09</option>
                        <option value="10">10</option>
                        <option value="11">11</option>
                        <option value="12">12</option>
                    </select>
                    <i className="fas fa-check-circle"></i>
                    <i className="fas fa-exclamation-circle"></i>
                </article>

                <article>
                    <select id="date" name="year" value={year} onChange={handleChange}>
                        <option value="" disabled>Year</option>
                        <option value="2022">2022</option>
                        <option value="2023">2023</option>
                        <option value="2024">2024</option>
                        <option value="2025">2025</option>
                        <option value="2026">2026</option>
                        <option value="2027">2027</option>
                        <option value="2028">2028</option>
                        <option value="2029">2029</option>
                        <option value="2030">2030</option>
                    </select>
                    <i className="fas fa-check-circle"></i>
                    <i className="fas fa-exclamation-circle"></i>
                </article>
                <small>{error.date}</small>
            </div>

            <div className={`form-field ${css.cvv}`}>
                <label htmlFor="cvv">CVV</label>
                <input 
                    type="text" 
                    value={cvv}
                    maxLength="3"
                    id="cvv" 
                    name="cvv"
                    ref={inputEl}
                    onChange={handleChange}
                    onKeyDown={isNumber} />
                <i className="fas fa-check-circle"></i>
                <i className="fas fa-exclamation-circle"></i>
                <small>{error.cvv}</small>
            </div>
        </div>
        <button>Submit</button>
    </form>
  )
}

export default Form