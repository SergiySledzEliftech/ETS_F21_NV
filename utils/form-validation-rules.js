const rules = {
  required: value => !!value || 'Required.',
  minLength: value => value.length > 1 || 'Min 2 characters',
  maxLength: value => value.length <= 20 || 'Min 20 characters',
  password: value => value.length > 5 || 'Min 6 characters',
  email: (value) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Invalid e-mail.'
  },
  avatar: value => !value || value.size < 200000 || 'Avatar size should be less than 0.19 MB!',
  // number: (value) => {
  //   const pattern = /[+]\d{2}\s[(]\d{3}[)]\s\d{3}[-]\d{2}[-]\d{2}/
  //   return pattern.test(value) || 'Invalid number'
  // },
  url: (value) => {
    return !value || /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/.test(value) || 'URL must be valid'
  },
  lengthNumber: value => !value || value.length === 13 || 'The number must have 13 characters'
  // maxLengthNumber: value => value.length > 13 || 'The number must have 13 characters'
  // v => /.+@.+\..+/.test(v) || 'E-mail must be valid'
}

export default rules
