export default null;
export const isFileImage = (file) => {
  const acceptedImageTypes = ['image/gif', 'image/jpeg', 'image/jpg', 'image/png'];

  return file && acceptedImageTypes.includes(file.type);
};
