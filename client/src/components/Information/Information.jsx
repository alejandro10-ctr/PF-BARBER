import React from 'react'
import styles from "./Information.module.css";

const Information = () => {
  return (
  <div className={styles.background}><br /> <br /><h1 className={styles.title}> FAQ </h1><br />
  

<h4 className={styles.cuestions}>🛒 How do I know if I registered correctly? You will receive a registration confirmation email!</h4><br />
 <h4 className={styles.cuestions}>🛒 How to make a purchase? Very easy! With your personal email account or by registering on our platform you can make purchases.

 </h4><br />
 
 
<h4 className={styles.cuestions}>🛒 How to pay? You can pay through the market payment in cash or by credit card.</h4>
 
<br /> 
<h4 className={styles.cuestions}>🛒 If I need help, How can I contact you? You could write to us at henrybarbershop.pf@gmail.com</h4>
  

  </div>
  )
}

export default Information