import React from 'react'

interface Icons {
  exlink: HTMLAnchorElement
  anchor: HTMLAnchorElement
}

const icons = {
  exlink:
    '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="600" width="32" height="32"><path d="M853.333333 469.333333a42.666667 42.666667 0 0 0-42.666666 42.666667v256a42.666667 42.666667 0 0 1-42.666667 42.666667H256a42.666667 42.666667 0 0 1-42.666667-42.666667V256a42.666667 42.666667 0 0 1 42.666667-42.666667h256a42.666667 42.666667 0 0 0 0-85.333333H256a128 128 0 0 0-128 128v512a128 128 0 0 0 128 128h512a128 128 0 0 0 128-128v-256a42.666667 42.666667 0 0 0-42.666667-42.666667z" p-id="601" ></path><path d="M682.666667 213.333333h67.413333l-268.373333 267.946667a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586666 0L810.666667 273.92V341.333333a42.666667 42.666667 0 0 0 42.666666 42.666667 42.666667 42.666667 0 0 0 42.666667-42.666667V170.666667a42.666667 42.666667 0 0 0-42.666667-42.666667h-170.666666a42.666667 42.666667 0 0 0 0 85.333333z" p-id="602" ></path></svg>',
  anchor:
    '<svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="724"><path d="M546.9184 665.4976c-48.2816 0-96.5632-18.3808-133.3248-55.1424-9.984-9.984-9.984-26.2144 0-36.1984s26.2144-9.984 36.1984 0c53.5552 53.5552 140.6464 53.5552 194.2016 0l186.1632-186.1632c53.5552-53.5552 53.5552-140.6464 0-194.2016s-140.6464-53.5552-194.2016 0l-157.0816 157.0816c-9.984 9.984-26.2144 9.984-36.1984 0s-9.984-26.2144 0-36.1984l157.0816-157.0816c73.5232-73.5232 193.1264-73.5232 266.5984 0s73.5232 193.1264 0 266.5984l-186.1632 186.1632c-36.7616 36.7616-85.0432 55.1424-133.3248 55.1424zM239.7184 972.6976c-48.2816 0-96.5632-18.3808-133.3248-55.1424-73.5232-73.5232-73.5232-193.1264 0-266.5984l186.1632-186.1632c73.5232-73.5232 193.1264-73.5232 266.5984 0 9.984 9.984 9.984 26.2144 0 36.1984s-26.2144 9.984-36.1984 0c-53.5552-53.5552-140.6464-53.5552-194.2016 0l-186.1632 186.1632c-53.5552 53.5552-53.5552 140.6464 0 194.2016s140.6464 53.5552 194.2016 0l157.0816-157.0816c9.984-9.984 26.2144-9.984 36.1984 0s9.984 26.2144 0 36.1984l-157.0816 157.0816c-36.7616 36.7616-85.0432 55.1424-133.3248 55.1424z" p-id="725"></path></svg>',
}

const jsxIcons = {
  Exlink: () => (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="600"
      width="32"
      height="32"
    >
      <path
        d="M853.333333 469.333333a42.666667 42.666667 0 0 0-42.666666 42.666667v256a42.666667 42.666667 0 0 1-42.666667 42.666667H256a42.666667 42.666667 0 0 1-42.666667-42.666667V256a42.666667 42.666667 0 0 1 42.666667-42.666667h256a42.666667 42.666667 0 0 0 0-85.333333H256a128 128 0 0 0-128 128v512a128 128 0 0 0 128 128h512a128 128 0 0 0 128-128v-256a42.666667 42.666667 0 0 0-42.666667-42.666667z"
        p-id="601"
      ></path>
      <path
        d="M682.666667 213.333333h67.413333l-268.373333 267.946667a42.666667 42.666667 0 0 0 0 60.586667 42.666667 42.666667 0 0 0 60.586666 0L810.666667 273.92V341.333333a42.666667 42.666667 0 0 0 42.666666 42.666667 42.666667 42.666667 0 0 0 42.666667-42.666667V170.666667a42.666667 42.666667 0 0 0-42.666667-42.666667h-170.666666a42.666667 42.666667 0 0 0 0 85.333333z"
        p-id="602"
      ></path>
    </svg>
  ),
  Anchor: () => (
    <svg
      viewBox="0 0 1024 1024"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      p-id="724"
    >
      <path
        d="M546.9184 665.4976c-48.2816 0-96.5632-18.3808-133.3248-55.1424-9.984-9.984-9.984-26.2144 0-36.1984s26.2144-9.984 36.1984 0c53.5552 53.5552 140.6464 53.5552 194.2016 0l186.1632-186.1632c53.5552-53.5552 53.5552-140.6464 0-194.2016s-140.6464-53.5552-194.2016 0l-157.0816 157.0816c-9.984 9.984-26.2144 9.984-36.1984 0s-9.984-26.2144 0-36.1984l157.0816-157.0816c73.5232-73.5232 193.1264-73.5232 266.5984 0s73.5232 193.1264 0 266.5984l-186.1632 186.1632c-36.7616 36.7616-85.0432 55.1424-133.3248 55.1424zM239.7184 972.6976c-48.2816 0-96.5632-18.3808-133.3248-55.1424-73.5232-73.5232-73.5232-193.1264 0-266.5984l186.1632-186.1632c73.5232-73.5232 193.1264-73.5232 266.5984 0 9.984 9.984 9.984 26.2144 0 36.1984s-26.2144 9.984-36.1984 0c-53.5552-53.5552-140.6464-53.5552-194.2016 0l-186.1632 186.1632c-53.5552 53.5552-53.5552 140.6464 0 194.2016s140.6464 53.5552 194.2016 0l157.0816-157.0816c9.984-9.984 26.2144-9.984 36.1984 0s9.984 26.2144 0 36.1984l-157.0816 157.0816c-36.7616 36.7616-85.0432 55.1424-133.3248 55.1424z"
        p-id="725"
      ></path>
    </svg>
  ),
}

export default Object.entries(icons).reduce(
  (acc, [name, str]) => {
    acc[name] = str
    return acc
  },
  new Proxy(
    {},
    {
      get: function (target, p) {
        const iconEl = document.createElement('a')
        iconEl.innerHTML = target[p]
        return iconEl
      },
      set: function (target, p, value) {
        return Reflect.set(target, p, value)
      },
    }
  ) as Icons
)

export { jsxIcons }