import React, { useState, useCallback, useEffect } from 'react';
import { Carousel, notification } from 'antd';
import ProductCard from './ProductCard';
import '../styles/BestSellerProduct.scss';

import handleError from '../../../common/utils/handleError';
import { getProductDetailList } from '../services';

const BestSellerProduct = () => {
  let carouselRef = React.createRef();
  const [products, setProducts] = useState([]);

  const getProductDetails = useCallback(async () => {
    try {
      const { data } = await getProductDetailList({ pageSize: 6 });
      setProducts(data.data);
    } catch (err) {
      handleError(err, null, notification);
    }
  }, []);

  useEffect(() => {
    getProductDetails();
  }, [getProductDetails]);

  const renderProductList = (arr = []) => {
    const tabSize = Math.ceil(arr.length / 3); // 3 products/tab
    const tabs = [];

    for (let i = 0; i < tabSize; i += 1) {
      const inTab = [];
      for (let j = i; j < i + 3; j += 1) {
        const specificProduct = arr[j];
        const { product } = specificProduct;
        if (!specificProduct || !product) break;
        inTab.push(
          <ProductCard
            key={specificProduct.id}
            product={specificProduct}
          />,
        );
      }
      if (!inTab[0]) break;
      tabs.push(
        <div key={i} className="d-flex justify-content-around">
          {inTab.map((it) => it)}
        </div>,
      );
    }
    return tabs.map((t) => t);
  };

  return (
    <div>
      <div className="container">
        <div className="top-seller--header">
          <hr />
          <div>BEST SELLER</div>
          <hr />
        </div>
        <div className="d-flex justify-content-between top-seller--btn">
          <i
            className="fas fa-chevron-left"
            onClick={() => carouselRef.prev()}
            type="button"
            role="presentation"
          />
          <i
            className="fas fa-chevron-right"
            onClick={() => carouselRef.next()}
            type="button"
            role="presentation"
          />
        </div>
        <Carousel
          ref={(ref) => {
            carouselRef = ref;
          }}
          dotPosition="bottom"
          style={{ marginBottom: 20 }}
        >
          {renderProductList(products)}
        </Carousel>
      </div>
    </div>
  );
};

export default BestSellerProduct;
