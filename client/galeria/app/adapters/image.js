import ApplicationAdapter from './application';

export default ApplicationAdapter.extend({
  formDataTypes: ['POST', 'PUT', 'PATCH'],
  ajaxOptions(url, type, options) {
    const data = options && options.data || {};
    const hash = this._super.apply(this, arguments);
    if (typeof FormData !== 'undefined' && data && this.formDataTypes.indexOf(type) >= 0) {
      hash.processData = false;
      hash.contentType = false;

      const formData = new FormData();
      Object.keys(data).forEach(key => {
        formData.append(key, data[key]);
      });
      hash.data = formData;
    }
    return hash;
  }
});
