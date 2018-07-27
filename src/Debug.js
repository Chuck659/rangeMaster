let debugData = 'Test Data';

export default {
  log: data => {
    debugData += '\n';
    debugData += data;
  },
  clear: () => {
    debugData = '';
  },
  getLog: () => {
    return debugData;
  }
};
