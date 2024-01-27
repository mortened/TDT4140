import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
//import "../css/ToastMessage.css";

function showToast(message, type='default', duration=2000, callback=null) {
  switch (type) {
    case 'success':
      toast.success(message, {
        position: 'top-right',
        autoClose: duration,
        onClose: callback,
      });
      break;
    case 'error':
      toast.error(message, {
        position: 'top-right',
        autoClose: duration,
        onClose: callback,
      });
      break;
    case 'warning':
      toast.warning(message, {
        position: 'top-right',
        autoClose: duration,
        onClose: callback,
      });
      break;
    default:
      toast(message, {
        position: 'top-right',
        autoClose: duration,
        onClose: callback,
      });
  }
}

function ToastMessage() {
  return (
    <ToastContainer />
  );
}

export { showToast, ToastMessage };
