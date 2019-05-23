
/**
 * 提交表单时移除相关字段输入的两侧多余空格
 * @param  {Object} values 表单数据集合
 * @param  {string} names  指定字段名称的集合（以逗号隔开的字符串）
 * @return {undefined}
 */
function trimSubmitParams(values, names) {
  if (names === undefined) {
    // 针对字符串数据处理
    Object.keys(values).forEach(key => {
      if (typeof values[key] === 'string') {
        values[key] = values[key].trim()
      }
    })
  } else {
    // 针对指定字段处理
    const arrNames = (names || '').split(',')

    arrNames.forEach(name => {
      if (values[name] !== undefined) {
        values[name] = (values[name] + '').trim()
      }
    })
  }
}
