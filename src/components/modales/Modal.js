import PropTypes from 'prop-types';
import '../../css/style/Modal.css';
import success from '../../css/img/success.svg';
import aspiranteExitoso from '../../css/img/modalAspiranteCreado.svg';
import SmartButton from '../ui/SmartButton';

const Modal = ({
  onConfirm = () => {},
  onCancel = () => {},
  closeModal,
  open,
  text,
  title,
  showClose = true,
  mode = 'confirm',
  image = aspiranteExitoso,
}) => {
  return (
    <div
      className="containModal flex items-center text-basic-gray"
      style={{ display: open ? 'flex' : 'none' }}
    >
      <div
        className={`modalContent rounded-xl mx-auto w-1/${
          mode === 'confirm' ? 4 : 3
        } bg-white py-4`}
      >
        {showClose && (
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
        )}
        <div className="mx-auto py-4 mt-4">
          {/*Contenido*/}
          {mode === 'success' && (
            <div className="w-full mt-2">
              <img className="mx-auto" src={success} width="50" alt="success" />
            </div>
          )}
          <h2 className="tituloModal text-xl text-center text-normalPurple mt-6">
            {title}
          </h2>
          {text && (
            <p className="text-base text-basic-gray mt-2 text-center">{text}</p>
          )}
          <img className="mx-auto mt-4" src={image} width="40%" alt="confirm" />
        </div>
        <div
          className="mx-auto w-full justify-center items-end mt-2"
          style={{ display: 'flex', marginBottom: '0px' }}
        >
          {mode === 'confirm' && (
            <>
              <SmartButton
                theme="small"
                onClick={() => {
                  onCancel();
                  closeModal();
                }}
              >
                Cancelar
              </SmartButton>
              <SmartButton
                theme="small"
                onClick={() => {
                  onConfirm();
                  closeModal();
                }}
              >
                Aceptar
              </SmartButton>
            </>
          )}
          {mode === 'success' && (
            <SmartButton
              onClick={() => {
                onConfirm();
                closeModal();
              }}
            >
              Aceptar
            </SmartButton>
          )}
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  closeModal: PropTypes.func,
  open: PropTypes.bool,
  showClose: PropTypes.bool,
  title: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
  mode: PropTypes.oneOf(['success', 'confirm']).isRequired,
};

export default Modal;
