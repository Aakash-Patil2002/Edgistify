import React from 'react'
import styles from './OrderSuccess.module.css'
import doneImage from '../../assets/check-mark.png';
import {Link} from 'react-router-dom'
function OrderSuccess() {
  return (
    <div className={styles.pageBody}>
        <div className={styles.innerBody}>
            <img src={doneImage} alt='Done' className={styles.doneImg}/>
            <h3 className={styles.thanksState}>Thank You for Ordering</h3>
            <p className='text-center'>Your order has been successfully placed. We’re getting it ready for you. Sit back and relax! Your order will be delivered soon.</p>
            <div className='d-flex justify-content-between'>
                <Link className={styles.viewOrder} to='/myorders'>View Order</Link>
                <Link className={styles.continueShoping} to='/'>Continue Shopping</Link>
            </div>
        </div>
    </div>
  )
}

export default OrderSuccess