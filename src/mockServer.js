// do some ajax, get whitelist array of all allowed tags, then set it onto the State
// set "showDropdown" to some value, which will filter the dropdown by that value
export const serverDelay = func => duration =>
  new Promise((resolve, reject) =>
    setTimeout(() => {
      resolve(func())
    }, duration || 1000)
  )

export const getWhitelistFromServer = serverDelay(() => [

])

// export const getValue = serverDelay(() => ["foo", "bar", "baz"])