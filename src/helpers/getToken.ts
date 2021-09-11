import axios from 'axios'

var options = {
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    form:
    {
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      audience: process.env.AUTH0_AUDIENCE,
      grant_type: 'client_credentials'
    },
    json: true
  };
  
  const token = async () => {
    try {
      const tokenRequest = await axios.post(options.url, options.form)
      return tokenRequest.data.access_token
    } catch (err){
      return err
    }
  } 


export default token;