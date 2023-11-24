'use client';
import styles from './PopUp.module.css';

export const PopUp = ({
  show,
  onConfirm,
  children,
  onCloseBtn,
  confirnName,
}) => {
  return show ? (
    <div className={styles.popup}>
      <div className={styles['popup-inner']}>
        <div>{children}</div>
        <div className={styles['btn-area']}>
          <button onClick={onConfirm}>{confirnName}</button>
          <button onClick={onCloseBtn}>Close</button>
          <div></div>
        </div>
      </div>
    </div>
  ) : null;
};
