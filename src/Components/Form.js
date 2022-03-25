import {useState} from 'react'
import Card from './Card'

const Form = () => {
// Values
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
    }

// handle submit
    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log('submit')
        for (var key in values) {
            if(!values[key].length){
                setErrorFor(key, 'This field is required');
            }else{
                checkInputs(key)
            }
        }

    }

//  check inputs
    const checkInputs = (input) => {

        if(input === 'cardNumber'){
            cardNumber.length === 13 ? setSuccessFor(input) : setErrorFor(input, 'You must have 13 numbers');
        }

        if(input === 'year'){
            let date = new Date();
            let getmonth = date.getMonth() + 1;
            let getyear = date.getFullYear().toString();

            if(( year === getyear && Number(month) >= getmonth) || year !== getyear){
                setSuccessFor(input)
            }else{
                setErrorFor(input, 'Invalid date')
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
        <Card />
        <div className={`form-field ${css.cardNumber}`}>
            <label htmlFor="cardNumber">Card Number</label>
            <input 
                type="number" 
                value={cardNumber}
                placeholder="1234 1234 1234 333 1" 
                name="cardNumber" 
                onChange={handleChange}
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
                    onChange={handleChange} />
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