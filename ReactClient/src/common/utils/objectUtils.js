import { catalogService } from '../../configs';

export const getValueByKey = (obj = {}, key) => {
  if (Object.prototype.hasOwnProperty.call(obj, key)) {
    return obj[key];
  }

  for (let i = 0; i < Object.keys(obj).length; i += 1) {
    const k = Object.keys(obj)[i];
    if (typeof obj[k] === 'object') {
      const value = getValueByKey(obj[k], key);
      if (!!value || value === 0) {
        return value;
      }
    }
  }

  return null;
};

export const getValueByPath = (obj = {}, path = '') => {
  if (!obj) return undefined;
  const keys = path.split('.');
  if (!keys[1]) {
    return obj[keys[0]];
  }

  if (obj[keys[0]] && typeof obj[keys[0]] === 'object') {
    const value = getValueByPath(
      obj[keys[0]],
      keys.splice(1, keys.length).join('.'),
    );
    if (!!value || value === 0) {
      return value;
    }
  }

  return undefined;
};

export const getDefaultImageUrl = (arr = [], isSecond, withCatalogUrl = true) => {
  const defaultImage = arr.find((image) => image.isDefault);
  const noDefaultImage = arr.find((image) => !image.isDefault);
  const catalogUrl = withCatalogUrl ? catalogService : '';
  const hoverNoDefaultImage = arr.find(
    (image) => !image.isDefault && image.id !== noDefaultImage.id,
  );

  if (!defaultImage && isSecond) {
    return (
      catalogUrl + (hoverNoDefaultImage ? hoverNoDefaultImage.url : '')
    );
  }

  if (!defaultImage) {
    return catalogUrl + (noDefaultImage ? noDefaultImage.url : '');
  }

  if (isSecond && noDefaultImage) {
    return catalogUrl + (noDefaultImage ? noDefaultImage.url : '');
  }

  return catalogUrl + (defaultImage ? defaultImage.url : '');
};

export const removeEmptyValueKey = (obj = {}) => {
  const data = { ...obj };
  Object.keys(data).forEach((key) => {
    if (!data[key] && data[key] !== 0) {
      delete data[key];
    }
  });
  return data;
};

export const mapSearchStringToObj = (str = '?') => {
  const searchString = decodeURI(str.split('?')[1]);
  if (!searchString) return undefined;

  let queries = searchString.split('&');
  queries = queries.map((q) => q.split('='));
  return removeEmptyValueKey(Object.fromEntries(queries));
};

export const mapObjToSearchString = (obj = {}) => encodeURI(
  `?${Object.entries(removeEmptyValueKey(obj))
    .map((x) => x.join('='))
    .join('&')}`,
);
