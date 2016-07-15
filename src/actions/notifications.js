import { toastr } from 'react-redux-toastr';

export const success = (title, message) => toastr.success(title, message);
export const error = (title, message) => toastr.error(title, message);
