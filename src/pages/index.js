'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
var tslib_1 = require('tslib');
var react_1 = tslib_1.__importStar(require('react'));
var antd_1 = require('antd');
var index_less_1 = tslib_1.__importDefault(require('./index.less'));
var icons_1 = require('@ant-design/icons');
require('antd/dist/antd.css'); // or 'antd/dist/antd.less'
// @ts-ignore
var electron = window.require('electron');
var ipcRenderer = electron.ipcRenderer;
exports.default = function() {
  var _a = react_1.useState([]),
    files = _a[0],
    setFiles = _a[1];
  var isFilesSelected = files && files.length > 0;
  ipcRenderer.on('dir-selectd', function(event, files) {
    if (!files) {
      return;
    }
    var canceled = files.canceled,
      filePaths = files.filePaths;
    if (canceled) {
      return;
    }
    setFiles(filePaths);
  });
  return react_1.default.createElement(
    'div',
    null,
    react_1.default.createElement(
      'h1',
      { className: index_less_1.default.title },
      'Page index',
    ),
    isFilesSelected &&
      react_1.default.createElement(
        'div',
        null,
        react_1.default.createElement(
          'div',
          null,
          '\u4F60\u5DF2\u7ECF\u9009\u62E9\u4E86:',
        ),
        files.map(function(file) {
          return react_1.default.createElement('div', null, file);
        }),
      ),
    !isFilesSelected &&
      react_1.default.createElement(
        'div',
        null,
        react_1.default.createElement(antd_1.Input, {
          placeholder: 'Basic usage',
          suffix: react_1.default.createElement(
            antd_1.Button,
            {
              onClick: function() {
                ipcRenderer.send('open-dir-select-dialog');
              },
            },
            react_1.default.createElement(icons_1.FolderOpenOutlined, null),
          ),
        }),
      ),
    isFilesSelected &&
      react_1.default.createElement(
        antd_1.Button,
        {
          onClick: function() {
            setFiles([]);
          },
        },
        '\u91CD\u65B0\u9009\u62E9',
      ),
  );
};
//# sourceMappingURL=index.js.map
