import React from 'react';
import { Carousel } from 'antd';
import ProductCard from './ProductCard';
import '../styles/BestSellerProduct.scss';

const SuggestProduct = () => {
  let carouselRef = React.createRef();
  return (
    <div>
      <div className="container">
        <div className="top-seller--header">
          <hr />
          <div>SAME PRODUCT</div>
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
          <div className="d-flex justify-content-around">
            {[1, 2, 3, 4].map((i) => (
              <ProductCard
                width="250px"
                key={i}
                product={{
                  name: 'Bas jlsdjfon nos ndofj psaoj ',
                  producer: 'producer',
                  price: 5000000,
                  image:
                'https://ananas.vn/wp-content/uploads/pro_basas_A61067_2-500x500.jpg',
                }}
              />
            ))}
          </div>
          <div className="d-flex justify-content-around">
            {[1, 2, 3].map((i) => (
              <ProductCard
                width="250px"
                key={i}
                product={{
                  name: 'Bas jlsdjfon nos ndofj psaoj ',
                  producer: 'producer',
                  price: 5000000,
                  image:
                'https://ananas.vn/wp-content/uploads/pro_urbas_A61062_1-1-500x500.jpg',
                }}
              />
            ))}
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default SuggestProduct;
