import axios from 'axios'
import { server } from '../server'

var options = {
    url: `https://${process.env.AUTH0_DOMAIN}/oauth/token`,
    form:
    {
      grant_type: process.env.GRANT_TYPE,
      username: process.env.TEST_USER,
      password: process.env.TEST_USER_PSW,
      audience: process.env.AUTH0_AUDIENCE,
      scope: process.env.SCOPE,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET
    },
    json: true
  };
  
  const token = async () => {
    try {
      const tokenRequest = await axios.post(options.url, options.form)
      // console.log(tokenRequest)
      server.close()
      return tokenRequest.data.access_token
    } catch (err){
      console.log(err)
      return err
    }
  } 


export default token;