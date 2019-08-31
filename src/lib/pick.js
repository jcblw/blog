export const pick = (obj, ...keys) =>
  Object.keys(obj).reduce((accum, key) => {
    if (keys.includes(key)) {
      Object.assign(accum, { [key]: obj[key] })
    }
    return accum
  }, {})
