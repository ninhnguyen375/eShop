import React, { useState } from 'react';
import {
  Upload, Table, notification, Typography, Divider, Button,
} from 'antd';
import readExcelFile from 'read-excel-file';
import { getValueByPath } from '../../../../common/utils/objectUtils';
import handleError from '../../../../common/utils/handleError';
import { importSpecificProducts } from '../../services';
import ExportCSV from './ExportCSV';

const ImportSpecificProduct = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [importErrors, setImportErrors] = useState([]);

  const tableColumns = [
    {
      key: 'Row',
      title: 'Row',
      dataIndex: 'row',
    },
    {
      key: 'SpecificProductId',
      title: 'SpecificProductId',
      dataIndex: 'SpecificProductId',
    },
    { key: 'Quantity', title: 'Quantity', dataIndex: 'Quantity' },
  ];

  const schema = {
    SpecificProductId: {
      prop: 'SpecificProductId',
      type: String,
      required: true,
    },
    Quantity: {
      prop: 'Quantity',
      type: Number,
      required: true,
    },
  };

  const handleImport = async () => {
    try {
      await importSpecificProducts(tableData);
      notification.success({
        message: 'Import specific product',
        description: 'Success!',
      });
      window.Modal.clear();
    } catch (err) {
      const data = getValueByPath(err, 'response.data');
      if (data && data[0]) {
        setImportErrors(data);
      } else {
        handleError(err, null, notification);
      }
    }
  };

  const handleReadFile = async (file) => {
    if (!file) {
      return;
    }

    try {
      const reader = await readExcelFile(file, {
        schema,
      });
      const { errors } = reader;
      let { rows } = reader;

      rows = rows.map((r, i) => ({ ...r, row: i + 2 }));

      setTableData(rows);
      setImportErrors(
        errors.map(
          (e) => `Row ${e.row + 1}. Column ${e.column} is ${e.error}, but got ${
            e.value
          }`,
        ),
      );
    } catch (err) {
      handleError(err, null, notification);
    }
  };

  const handleChangeFile = async (file) => {
    setExcelFile(getValueByPath(file, 'file'));
    await handleReadFile(getValueByPath(file, 'file.originFileObj'));
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col-lg-2">
          <div className="row">
            <Upload
              showUploadList={false}
              fileList={excelFile ? [excelFile] : []}
              customRequest={({ onSuccess }) => {
                setTimeout(() => onSuccess('ok'), 0);
              }}
              onChange={handleChangeFile}
              onPreview={() => {}}
              type="drag"
            >
              <p className="ant-upload-drag-icon">
                <i
                  className="fas fa-file-upload"
                  style={{ fontSize: '2.8em' }}
                />
              </p>
              <p>Click or drag file to this area to upload</p>
            </Upload>
          </div>
          <div className="row mt10">
            <ExportCSV
              aoaData={[
                {
                  SpecificProductId: 'P1C1S25',
                  Quantity: 10,
                },
                {
                  SpecificProductId: 'P1C1S26',
                  Quantity: 10,
                },
              ]}
              btnText="Download example"
              style={{ width: '100%' }}
              fileName="ImportSpecificProduct"
            />
          </div>
        </div>

        <div className="col-lg-6">
          <Table
            size="small"
            dataSource={tableData && tableData[0] ? tableData : []}
            columns={tableColumns}
          />
        </div>

        <div className="col-lg-4">
          <div>Errors:</div>
          <Divider style={{ margin: '10px 0' }} />
          {importErrors && importErrors[0]
            ? importErrors.map((err) => (
              <div>
                <Typography.Text type="danger">
                  {err}
                  .
                </Typography.Text>
              </div>
            ))
            : undefined}
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-end mt20">
            <Button
              onClick={() => {
                window.Modal.clear();
              }}
              className="mr10"
            >
              Cancel
            </Button>
            <Button onClick={handleImport} type="primary">
              Import
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImportSpecificProduct;
