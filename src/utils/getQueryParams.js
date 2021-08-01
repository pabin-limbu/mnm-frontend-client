export default (query) => {
  if (query) {
    // ther is aquery string that seperate the parameter and the initial value.. ex. www.something/page1?name=abc&type=human
    const queryString = query.split("?")[1];
    if (queryString.length > 0) {
      const params = queryString.split("&");
      const paramsObject = {};
      params.forEach((param) => {
        const keyValue = param.split("=");
        paramsObject[keyValue[0]] = keyValue[1];
        //NOTE: dynamic key set garna lai [] and static key set garna lai dot "."
      });

      return paramsObject;
    }
  }
  return {};
};
