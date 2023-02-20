export const endpoints = [
  {
    account: 'qa',
    urlBase: '',
    host: '',
  },
  {
    account: 'prod',
    urlBase: 'https://n586ggoxy8.execute-api.us-east-1.amazonaws.com/dev',
    host: 'github',
  },
  {
    account: 'dev',
    urlBase: 'http://localhost:4000/dev',
    host: '127',
  },
]

export const endpoint = () => {
  const { host } = window.location
  return (
    endpoints.find((endpoint) => endpoint.host.includes(host))?.urlBase ??
    'http://localhost:4000/dev'
  )
}
