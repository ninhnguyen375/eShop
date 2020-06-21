/* eslint-disable no-console */
export default (err, form, noti) => {
  if (!err) {
    return;
  }

  if (!noti) {
    console.log('[✔] Debug: noti', noti);
    return;
  }
  const status = err.response ? err.response.status : undefined;

  if (status === 404) {
    noti.error({ message: 'Not Found' });
    return;
  }

  if (status === 500) {
    noti.error({ message: 'Internal Server Error' });
    return;
  }

  if (status === 401) {
    noti.error({ message: 'You do not have permission' });
    return;
  }

  const data = err.response ? err.response.data : undefined;
  const isOnFormError = !!form;

  if (!data) {
    noti.error({ message: err.message || 'Server Error' });
    return;
  }

  const errors = data.errors ? data.errors : data;

  if (typeof errors === 'string') {
    noti.error({ message: 'Error', description: errors });
  }

  Object.keys(errors).forEach((key) => {
    if (isOnFormError) {
      console.log('[✔] Debug: form.getFieldValue(key)', form.getFieldValue(key));
      if (form.getFieldValue(key) === undefined) {
        noti.error({
          message: Array.isArray(errors[key]) ? errors[key][0] : errors[key],
        });
      } else {
        form.setFields([
          {
            name: key[0].toLowerCase() + key.substring(1),
            errors: Array.isArray(errors[key]) ? errors[key] : [errors[key]],
            value: form.getFieldValue(key),
          },
        ]);
      }
    } else if (key.toLowerCase() !== 'success') {
      noti.error({
        message: Array.isArray(errors[key]) ? errors[key][0] : errors[key],
      });
    }
  });
};
