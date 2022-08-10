import PropTypes from 'prop-types';
import '../../css/style/Modal.css';

const ModalForm = ({
  closeModal,
  open,
  text,
  title,
  showClose = true,
  children,
}) => {
  return (
    <div
      className="containModal flex items-center text-basic-gray"
      style={{ display: open ? 'flex' : 'none' }}
    >
      <div className={`modalContent rounded-xl mx-auto w-1/3 bg-white py-4`}>
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
          <h2 className="tituloModal text-xl text-center text-normalPurple mt-6">
            {title}
          </h2>
          <div className="w-4/5 m-auto">{children}</div>
        </div>
        <div
          className="mx-auto w-full justify-center items-end mt-2"
          style={{ display: 'flex', marginBottom: '0px' }}
        ></div>
      </div>
    </div>
  );
};

ModalForm.propTypes = {
  children: PropTypes.element,
  closeModal: PropTypes.func,
  closeOnSubmit: PropTypes.bool,
  open: PropTypes.bool,
  showClose: PropTypes.bool,
  title: PropTypes.string.isRequired,
};

export default ModalForm;
