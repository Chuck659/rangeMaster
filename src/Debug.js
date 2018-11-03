let debugData = 'Test Data';

export default {
  log: data => {
    debugData += '\n';
    debugData += data;
    debugData = debugData.slice(-8192);
  },
  clear: () => {
    debugData = '';
  },
  getLog: () => {
    return debugData;
  }
};
