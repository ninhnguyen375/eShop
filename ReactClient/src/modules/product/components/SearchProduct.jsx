import React, { useState, useEffect, useCallback } from 'react';
import '../styles/SearchProduct.scss';
import {
  Radio, Tooltip, Card, Pagination, Button,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation, useHistory } from 'react-router';
import ProductCard from './ProductCard';
import { VIEW_MODE, MODULE_NAME as MODULE_PRODUCT, LIMIT } from '../models';
import { MODULE_NAME as MODULE_CATEGORY } from '../../category/models';

import { getProductDetailList } from '../actions';
import { getCategoryListAction } from '../../category/actions';
import {
  mapSearchStringToObj,
  mapObjToSearchString,
} from '../../../common/utils/objectUtils';
import { getStyleListAction } from '../../style/actions';
import { MODULE_NAME as MODULE_STYLE } from '../../style/models';
import { MODULE_NAME as MODULE_COLOR } from '../../productColor/models';
import { getProductColorListAction } from '../../productColor/actions';
import { areEqualNumbers } from '../../../common/utils/numberUtils';

const SearchProduct = () => {
  const [viewMode, setViewMode] = useState(VIEW_MODE.gridView);
  const productDetailList = useSelector(
    (state) => state[MODULE_PRODUCT].productDetailList,
  );
  const categoryList = useSelector(
    (state) => state[MODULE_CATEGORY].categoryList,
  );
  const styleList = useSelector((state) => state[MODULE_STYLE].styleList);
  const productColorList = useSelector(
    (state) => state[MODULE_COLOR].productColorList,
  );
  const products = productDetailList ? productDetailList.data || [] : [];
  const categories = categoryList ? categoryList.data || [] : [];
  const styles = styleList ? styleList.data || [] : [];
  const productColors = productColorList ? productColorList.data || [] : [];
  const productWidth = viewMode === VIEW_MODE.listView ? '100%' : '280px';
  const location = useLocation();
  const history = useHistory();

  const dispatch = useDispatch();
  const [search, setSearch] = useState({});
  const pagination = {
    current: productDetailList ? productDetailList.currentPage : 1,
    pageSize: productDetailList ? productDetailList.pageSize : LIMIT,
    total: productDetailList ? productDetailList.totalCount : 0,
    totalPage: productDetailList ? productDetailList.totalPage : 0,
  };

  useEffect(() => {
    if (location.search) {
      setSearch(mapSearchStringToObj(location.search));
    }
  }, [location.search]);

  const pushSearch = (key, value) => {
    if (!key) {
      setSearch({});
      history.push('/search-product');
      return;
    }

    setSearch({ ...search, [key]: value });
    history.push(
      `/search-product${mapObjToSearchString({
        ...search,
        [key]: value,
      })}`,
    );
  };

  const getProductDetails = useCallback(
    async (queries) => {
      const data = { ...queries };
      Object.keys(data).forEach((key) => {
        if (data[key] === '' || data[key] === null) {
          delete data[key];
        }
      });

      dispatch(getProductDetailList({ ...data }));
    },
    [dispatch],
  );

  useEffect(() => {
    if (location.search) {
      const queries = mapSearchStringToObj(location.search);
      setSearch(queries);
      getProductDetails(queries);
    } else {
      setSearch({});
      getProductDetails();
    }
  }, [getProductDetails, location]);

  useEffect(() => {
    dispatch(getCategoryListAction());
    dispatch(getStyleListAction());
    dispatch(getProductColorListAction());
  }, [dispatch]);

  const handlePageChange = (page) => {
    const data = { pageNumber: page };

    getProductDetails({ ...search, ...data });
  };

  return (
    <div className="search-product-layout container-fluid">
      <div className="row">
        <div className="search-product-layout--sider col-lg-2 offset-lg-1">
          <div className="sider--title">categories</div>
          <div className="sider--divider" />
          <div
            role="presentation"
            onClick={() => pushSearch('categoryId')}
            className={`sider--menu-item${!search.categoryId ? ' active' : ''}`}
          >
            <i className="fas fa-braille mr5" />
            ALL
          </div>
          {categories.map((c) => (
            <div
              role="presentation"
              onClick={() => pushSearch('categoryId', c.id)}
              className={`sider--menu-item${
                areEqualNumbers(c.id, search.categoryId) ? ' active' : ''
              }`}
              key={c.id}
            >
              <i className="fas fa-braille mr5" />
              {c.name}
            </div>
          ))}

          <div className="sider--title">styles</div>
          <div className="sider--divider" />
          <div
            role="presentation"
            onClick={() => pushSearch('styleId')}
            className={`sider--menu-item${!search.styleId ? ' active' : ''}`}
          >
            <i className="fas fa-braille mr5" />
            ALL
          </div>
          {styles.map((c) => (
            <div
              role="presentation"
              onClick={() => pushSearch('styleId', c.id)}
              className={`sider--menu-item${
                areEqualNumbers(c.id, search.styleId) ? ' active' : ''
              }`}
              key={c.id}
            >
              <i className="fas fa-braille mr5" />
              {c.name}
            </div>
          ))}

          <div className="sider--title">Colors</div>
          <div className="sider--divider" />
          <div className="d-flex flex-wrap">
            {productColors.map((c) => (
              <div
                role="presentation"
                onClick={() => pushSearch(
                  'colorId',
                  areEqualNumbers(c.id, search.colorId) ? '' : c.id,
                )}
                className="mr5 mt5 sider--menu-item"
                key={c.id}
              >
                <div
                  className="w70 p5"
                  style={{
                    boxShadow:
                      c.id === (search && parseInt(search.colorId, 10))
                        ? '0 0 10px #faad14'
                        : '0 0 10px #dfdfdf',
                    transition: '0.3s',
                  }}
                >
                  <div
                    style={{
                      width: '50px',
                      height: '30px',
                      borderRadius: '2px',
                      background: c.hexCode,
                      border: '1px solid lightgrey',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="search-product-layout--content col-lg-9">
          <Card className="content--tool-bar" bodyStyle={{ padding: 5 }}>
            <div className="d-flex justify-content-between">
              <Button onClick={() => pushSearch()} type="link">
                <i className="fas fa-sync mr5" />
                Reset search
              </Button>
              <Radio.Group
                onChange={(e) => {
                  setViewMode(e.target.value);
                }}
                value={viewMode}
              >
                <Tooltip title="List view">
                  <Radio.Button value={VIEW_MODE.listView}>
                    <i className="fas fa-align-justify" />
                  </Radio.Button>
                </Tooltip>
                <Tooltip title="Grid view">
                  <Radio.Button value={VIEW_MODE.gridView}>
                    <i className="fas fa-border-all" />
                  </Radio.Button>
                </Tooltip>
              </Radio.Group>
            </div>
          </Card>
          <div
            className="content--list-product"
            style={{ '--product-width': productWidth }}
          >
            {!products[0]
              ? undefined
              : products.map((specificProduct) => (
                <ProductCard
                  key={specificProduct.id}
                  width={productWidth}
                  viewMode={viewMode}
                  product={specificProduct}
                />
              ))}
          </div>

          <br />
          <br />
          <div className="d-flex justify-content-center container">
            {pagination.totalPage < 2 ? undefined : (
              <Pagination
                current={pagination.current}
                pageSize={pagination.pageSize}
                total={pagination.total}
                onChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchProduct;
