declare module 'gatsby-plugin-mailchimp' {
  function addToMailchimp(
    email: string,
    fields?: object,
    endpointOverride?: string,
  ): Promise<{
    result: 'success' | 'error'
    msg: string
  }>

  export default addToMailchimp
}
