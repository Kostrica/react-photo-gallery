import React from "react";
import Modal from "react-modal";

import { ReactComponent as CrossIcon } from "../../assets/img/remove.svg";
import styles from "./Popup.module.scss";

Modal.setAppElement('#root');

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: 'max-content',
    padding: '0',
    borderRadius: '20px',
    zIndex: '500',
  },
  overlay: {
    background: "#00000099",
  }
};

export const Popup = ({ isOpenModal, handleCloseModal, removePhoto, photo }) => (
  <Modal
    isOpen={isOpenModal}
    onRequestClose={handleCloseModal}
    style={customStyles}
  >
    <div className={photo?.url ? styles.popupPhoto : styles.popupQuestion}>
      <CrossIcon
        className={styles.crossIcon}
        onClick={handleCloseModal}
      />
      {
        photo?.url
          ? <img
              src={photo?.url}
              alt='big_Photo'
            />
          : <div className={styles.wraperQuestionBox}>
              <span className={styles.question}>Are you sure you want to delete this photo?</span>
              <div className={styles.buttonBox}>
                <button
                  className={styles.buttonOk}
                  type='button'
                  name='ok'
                  onClick={removePhoto}
                >
                  ok
                </button>
                <button
                  className={styles.buttonCancel}
                  type='button'
                  name='cancel'
                  onClick={handleCloseModal}
                >
                  cancel
                </button>
              </div>
            </div>
      }
    </div>
  </Modal>
);
