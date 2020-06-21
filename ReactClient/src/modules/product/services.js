import { ENDPOINTS, LIMIT } from './models';
import { fetchAuthLoading, fetchLoading } from '../../common/effects';
import { mapPayloadToForm } from '../../common/utils/mapping';
import { isFileImage } from '../../common/utils/fileUtils';

export const getProductList = (opt = {}) => fetchAuthLoading({
  url: ENDPOINTS.getProductList,
  method: 'GET',
  params: { pageSize: LIMIT, ...opt },
});

export const getProductDetailList = (opt = {}) => fetchLoading({
  url: ENDPOINTS.getProductDetailList,
  method: 'GET',
  params: { pageSize: LIMIT, ...opt },
});

export const addProductService = (product = {}) => {
  const data = mapPayloadToForm(product);

  return fetchAuthLoading({
    url: ENDPOINTS.addProduct,
    method: 'POST',
    data,
  });
};

export const addProductDetailService = (id, productDetail = {}) => {
  let data = { ...productDetail };
  const files = data.images.fileList;
  delete data.images.fileList;

  if (!files) { throw new Error('Invalid Images'); }

  console.log('[✔] Debug: addProductDetailService -> data', data);
  files.forEach((f) => {
    if (!isFileImage(f.originFileObj)) {
      throw new Error('Invalid Images');
    }
  });

  data = mapPayloadToForm(data, files, 'images');

  return fetchAuthLoading({
    url: ENDPOINTS.addProductDetail(id),
    method: 'POST',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getProductDetailById = (id) => fetchLoading({
  url: ENDPOINTS.getProductDetailById(id),
  method: 'GET',
});

export const getProductByIdAsync = (id) => fetchLoading({
  url: ENDPOINTS.getProductById(id),
  method: 'GET',
});

export const updateProductAsync = (id, product) => {
  const data = mapPayloadToForm(product);

  return fetchAuthLoading({
    url: ENDPOINTS.updateProduct(id),
    method: 'PUT',
    data,
  });
};

export const importSpecificProducts = (data) => fetchAuthLoading({
  url: ENDPOINTS.importSpecificProducts,
  method: 'POST',
  data: {
    items: data,
  },
});

export default null;
