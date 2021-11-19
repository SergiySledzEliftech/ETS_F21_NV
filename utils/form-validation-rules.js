const rules = {
  required: value => !!value || 'Required.',
  minLength: value => value.length > 1 || 'Min 2 characters',
  maxLength: value => value.length <= 20 || 'Min 20 characters',
  password: value => value.length > 5 || 'Min 6 characters',
  email: (value) => {
    const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return pattern.test(value) || 'Invalid e-mail.'
  },
  avatar: value => !value || value.size < 2000000 || 'Avatar size should be less than 2 MB!'
}

export default rules
