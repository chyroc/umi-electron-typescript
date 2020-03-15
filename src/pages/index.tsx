import React, { useState } from 'react';
import { Input, Button } from 'antd';
import styles from './index.less';
import * as Electron from 'electron';
import { FolderOpenOutlined } from '@ant-design/icons';
import 'antd/dist/antd.css'; // or 'antd/dist/antd.less'

// @ts-ignore
const electron: Electron = window.require('electron');
const ipcRenderer = electron.ipcRenderer;

export default () => {
  const [files, setFiles] = useState([]);
  const isFilesSelected = files && files.length > 0;

  ipcRenderer.on('dir-selectd', (event, files) => {
    if (!files) {
      return;
    }
    const { canceled, filePaths } = files;
    if (canceled) {
      return;
    }
    setFiles(filePaths);
  });

  return (
    <div>
      <h1 className={styles.title}>Page index</h1>
      {isFilesSelected && (
        <div>
          <div>你已经选择了:</div>
          {files.map(file => {
            return <div>{file}</div>;
          })}
        </div>
      )}
      {!isFilesSelected && (
        <div>
          <Input
            placeholder="Basic usage"
            suffix={
              <Button
                onClick={() => {
                  ipcRenderer.send('open-dir-select-dialog');
                }}
              >
                <FolderOpenOutlined />
              </Button>
            }
          />
        </div>
      )}

      {isFilesSelected && (
        <Button
          onClick={() => {
            setFiles([]);
          }}
        >
          重新选择
        </Button>
      )}
    </div>
  );
};
