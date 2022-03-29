
const BackCard = ({cvv, css}) => {
    const receiveCVV = !cvv.length ? '***' : handleCvv();

    function handleCvv(){
      let numbersLeft = 3 - cvv.length;

      if (cvv.length <= 3) {
          let output = cvv + '*'.repeat(numbersLeft)
          return output
      }else{
          return cvv
      }
  }

  return (
    <div className={`card-wrapper back-card ${css}`}>
        <p>CVV</p>

        <article>            
            <p>{receiveCVV}</p>
        </article>
    </div>
  )
}

export default BackCard