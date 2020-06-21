import React, { useEffect, useState } from 'react';
import {
  Button, Table, Input, Tooltip,
} from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {
  MODULE_NAME as MODULE_PRODUCT,
  LIMIT,
  emptyString,
} from '../../models';
import { getProductDetailList } from '../../actions';
import { catalogService } from '../../../../configs';
import {
  getValueByKey,
  getValueByPath,
} from '../../../../common/utils/objectUtils';
import ImportSpecificProduct from './ImportSpecificProduct';
import SpecificProductDetails from './SpecificProductDetails';

const ProductDetailList = () => {
  const dispatch = useDispatch();
  const [search, setSearch] = useState({});
  const productDetailList = useSelector(
    (state) => state[MODULE_PRODUCT].productDetailList,
  );
  const paginationProductDetailList = {
    current: productDetailList ? productDetailList.currentPage : 1,
    pageSize: productDetailList ? productDetailList.pageSize : LIMIT,
    total: productDetailList ? productDetailList.totalCount : 0,
  };
  const productDetails = productDetailList ? productDetailList.data || [] : [];

  const handleShowDetails = (record) => {
    if (!record || !record.id) return;

    window.Drawer.show(
      <SpecificProductDetails specificProductId={record.id} />,
      {
        title: <b>DETAILS</b>,
        width: 300,
      },
    );
  };

  const handleImport = () => {
    window.Modal.show(
      <ImportSpecificProduct />,
      {
        title: <b>IMPORT SPECIFIC PRODUCT</b>,
        style: { top: 10, maxWidth: '1030px' },
        width: '95vw',
      },
    );
  };

  useEffect(() => {
    dispatch(getProductDetailList());
  }, [dispatch]);

  const handleTableChange = (page, filter, sorter) => {
    const { field, order } = sorter;
    const data = { pageNumber: page.current };

    if (order === 'ascend') {
      data.sortAsc = field;
    }
    if (order === 'descend') {
      data.sortDesc = field;
    }

    // remove all null or empty search values
    Object.keys(search).forEach((key) => {
      if (search[key] === '' || search[key] === null) {
        delete search[key];
      }
    });

    dispatch(getProductDetailList({ ...data, ...search }));
  };

  const handleSearchByName = (value) => {
    setSearch({ ...search, name: value });
    if (!value) {
      dispatch(getProductDetailList());
      return;
    }
    dispatch(getProductDetailList({ name: value }));
  };

  const handleSearchById = (value) => {
    setSearch({ ...search, id: value });
    if (!value) {
      dispatch(getProductDetailList());
      return;
    }
    dispatch(getProductDetailList({ id: value }));
  };

  const getDefaultImageUrl = (arr = [], isSecond) => {
    const defaultImage = arr.find((image) => image.isDefault);
    const noDefaultImage = arr.find((image) => !image.isDefault);
    const hoverNoDefaultImage = arr.find(
      (image) => !image.isDefault && image.id !== noDefaultImage.id,
    );

    if (!defaultImage && isSecond) {
      return catalogService + (hoverNoDefaultImage ? hoverNoDefaultImage.url : '');
    }

    if (!defaultImage) {
      return catalogService + (noDefaultImage ? noDefaultImage.url : '');
    }

    if (isSecond && noDefaultImage) {
      return catalogService + (noDefaultImage ? noDefaultImage.url : '');
    }

    return catalogService + (defaultImage ? defaultImage.url : '');
  };

  const columnsProductDetail = [
    {
      key: 'id',
      title: 'PID',
      render: (r) => (
        <b style={{ color: '#1890ff', cursor: 'pointer' }}>
          {r.id || emptyString}
        </b>
      ),
    },
    {
      key: 'avatar',
      render: (r) => (
        <img
          onMouseOver={() => {
            const url = getDefaultImageUrl(r.images, true);
            document.getElementById(`img${r.id}`).setAttribute('src', url);
          }}
          onMouseOut={() => {
            const url = getDefaultImageUrl(r.images);
            document.getElementById(`img${r.id}`).setAttribute('src', url);
          }}
          id={`img${r.id}`}
          onFocus={() => {}}
          onBlur={() => {}}
          width={120}
          style={{
            borderRadius: 5,
            boxShadow: '7px 7px 10px #e3e3e3',
          }}
          src={getDefaultImageUrl(r.images)}
          alt="avatar"
        />
      ),
    },
    {
      key: 'name',
      title: 'Name',
      width: 215,
      render: (r) => (
        <Tooltip title="Product Name">
          <b style={{ color: '#1890ff', cursor: 'pointer' }}>
            {r.product ? r.product.name : emptyString}
          </b>
        </Tooltip>
      ),
    },
    {
      key: 'category',
      title: 'Category',
      render: (r) => {
        const name = getValueByKey(getValueByKey(r, 'category'), 'name');
        return (
          <Tooltip title="Product Category">
            <b style={{ color: '#1890ff', cursor: 'pointer' }}>
              {name || emptyString}
            </b>
          </Tooltip>
        );
      },
    },
    {
      key: 'style',
      title: 'Style',
      render: (r) => {
        const name = getValueByPath(r, 'product.style.name');
        return (
          <Tooltip title="Product Style">
            <b style={{ color: '#1890ff', cursor: 'pointer' }}>
              {name || emptyString}
            </b>
          </Tooltip>
        );
      },
    },
    {
      key: 'status',
      title: 'Status',
      render: (r) => (
        <Tooltip title="Product Status">
          <b style={{ color: '#1890ff', cursor: 'pointer' }}>
            {getValueByPath(r, 'product.status') || emptyString}
          </b>
        </Tooltip>
      ),
    },
    {
      key: 'color',
      title: 'Color',
      render: (r) => (
        <div className="w70 p5" style={{ boxShadow: '0 0 10px #dfdfdf' }}>
          <div
            style={{
              width: '50px',
              height: '30px',
              borderRadius: '2px',
              background: getValueByPath(r, 'color.hexCode'),
              border: '1px solid lightgrey',
            }}
          />
        </div>
      ),
    },
    {
      key: 'action',
      title: 'Action',
      align: 'right',
      render: (record) => (
        <div>
          <Button onClick={() => handleShowDetails(record)} className="mr5">
            <i className="fas fa-info-circle mr5" />
            Details
          </Button>
          <Button type="primary">
            <i className="fas fa-edit mr5" />
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between">
        <div>
          <Input.Search
            style={{ width: 300, marginRight: 10 }}
            onSearch={handleSearchById}
            placeholder="Search by ID"
          />
          <Input.Search
            style={{ width: 300 }}
            onSearch={handleSearchByName}
            placeholder="Search by name"
          />
        </div>
        <Button onClick={handleImport} type="primary">
          <i className="fas fa-plus mr5" />
          <b>IMPORT</b>
        </Button>
      </div>
      <div style={{ margin: '10px 0' }} />
      <Table
        rowKey={(r) => r.id}
        columns={columnsProductDetail}
        dataSource={productDetails}
        pagination={paginationProductDetailList}
        onChange={handleTableChange}
      />
    </div>
  );
};

export default ProductDetailList;
