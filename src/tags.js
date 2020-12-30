const tagData = (data, tag) => ({ tag, data });

const getTag = (taggedData) => taggedData.tag;

const getData = (taggedData) => taggedData.data;

export {
  getTag,
  getData,
  tagData as default,
};
