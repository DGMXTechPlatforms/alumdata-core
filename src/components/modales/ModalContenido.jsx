import PropTypes from 'prop-types';
import '../../css/style/Modal.css';
import SmartButton from '../ui/SmartButton';

const Modal = ({
  onClickAccept,
  onClickCancel,
  closeModal,
  open,
  contenido,
}) => {
  return (
    <div
      className="containModal flex items-center text-basic-gray"
      style={{ display: open ? 'flex' : 'none' }}
    >
      <div className="modalContent rounded-xl mx-auto w-1/3 bg-white py-4">
        <div
          onClick={closeModal}
          className="cerrarModal relative float-right px-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </div>

        {!!contenido ? contenido : <></>}

        <div
          className="mx-auto w-full justify-center items-end mt-2"
          style={{ display: 'flex', marginBottom: '0px' }}
        >
          <SmartButton theme="small" onClick={onClickCancel}>
            Cancelar
          </SmartButton>
          <SmartButton theme="small" onClick={onClickAccept}>
            Aceptar
          </SmartButton>
          {/*<button onClick={onClickCancel} className="">Cancelar</button>*/}
          {/*<button onClick={onClickAccept} className="font-sans text-lg appearance-none my-4 mx-2 px-12 py-2 border-transparent text-white bg-smartPurple rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-smartPurple hover:bg-cyan-700 sm:text-base">Aceptar</button>*/}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onClickAccept: PropTypes.func,
  onClickCancel: PropTypes.func,
  closeModal: PropTypes.func,
  open: PropTypes.bool,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
};

export default Modal;
