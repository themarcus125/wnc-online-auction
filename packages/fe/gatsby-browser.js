import 'uikit/dist/css/uikit.min.css';
import UIKit from 'uikit/dist/js/uikit.min.js';
import icons from 'uikit/dist/js/uikit-icons.min.js';
import './src/assets/css/global.css';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

if (typeof window !== 'undefined') {
  UIKit.use(icons);
}
