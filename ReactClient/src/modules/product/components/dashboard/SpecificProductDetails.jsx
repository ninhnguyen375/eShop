import React, { useCallback, useEffect, useState } from 'react';
import { Tag, Table, notification } from 'antd';
import PropTypes from 'prop-types';
import { getProductDetailById } from '../../services';
import handleError from '../../../../common/utils/handleError';

const SpecificProductDetails = ({ specificProductId }) => {
  const [sizes, setSizes] = useState([]);

  const getSpecificProduct = useCallback(async (id) => {
    if (!id) return;
    try {
      const { data } = await getProductDetailById(id);
      setSizes(data.sizes);
    } catch (err) {
      handleError(err, null, notification);
    }
  }, []);

  useEffect(() => {
    getSpecificProduct(specificProductId);
  }, [getSpecificProduct, specificProductId]);

  const columns = [
    {
      key: 'id',
      title: 'Specific Product ID',
      dataIndex: 'specificProductId',
      render: (s) => <b style={{ color: '#1890ff', cursor: 'pointer' }}>{s}</b>,
    },
    {
      key: 'sizeValue',
      title: 'Size',
      dataIndex: 'sizeValue',
      render: (s) => <Tag>{s}</Tag>,
    },
    {
      key: 'stock',
      title: 'In stock',
      dataIndex: 'stock',
      render: (s) => <b>{s}</b>,
    },
  ];

  return (
    <div>

      <Table
        rowKey={(r) => r.id}
        size="small"
        columns={columns}
        dataSource={sizes && sizes[0] ? sizes || [] : []}
      />
    </div>
  );
};

SpecificProductDetails.propTypes = {
  specificProductId: PropTypes.string.isRequired,
};

export default SpecificProductDetails;
