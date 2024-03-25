import React, {useState} from "react";
import { TextField, Button, AppBar, Toolbar, Divider, Box, Typography } from "@mui/material";
import { Container } from '@mui/system';
import { getDIDAuth, mockLCW } from "@digitalcredentials/lcw-mock";
const App = () => {

    const [challenge, setChallenge] = useState("")
    const [deepLink, setDeepLink] = useState("")
    const [didAuth, setDidAuth] = useState("")
    const [response, setResponse] = useState("")

    const handleDidAuthClick = async (event) => {
        const result = await getDIDAuth(challenge)
        setDidAuth(result)
        console.log("the didAuth: ")
        console.log(result)
    }
    
    const handleDeepLinkClick = async (event) => {
      const result = await mockLCW(deepLink)
      setResponse(result)
      console.log("the didAuth: ")
      console.log(result)
  }
    
    return ( 
        <React.Fragment>


    <AppBar position='inline'><Toolbar>Learner Credential Wallet Mock</Toolbar></AppBar>
    <Container>

<Box sx={{m:6}}><Typography variant="h6" >You have two choices here: <br/><br/>
1. Generate a 
DIDAuth for a given challenge, which you can then use in the call to an issuer's exchange
endpoint. <br/>
2. Provide a deeplink from which the code will
extract the challenge and the vc_request_url then generate a DIDAuth and submit
it to the vc_request_url to get back the VC. </Typography></Box>

 <Box border={1} sx={{p:2}}>
            <h2>Generate a DIDAuth for a challenge</h2>
                <TextField 
                    label="Challenge"
                    onChange={e => setChallenge(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    sx={{mb: 3}}
                    fullWidth
                    value={challenge}
                 />

<Button sx={{mb: 4}} variant="outlined" color="secondary" onClick={handleDidAuthClick}>Generate DIDAuth</Button>

{didAuth &&
             <>    <h3>Constructed DIDAuth:</h3>

            <pre>{JSON.stringify(didAuth, null, 2)}</pre>
            </> 
}         

</Box>
        
     

      <Box border={1} sx={{p:2, my: 3}} >Y
<h2>Mock the Wallet DIDAuth call for a deeplink</h2>

                 <TextField 
                    label="Deep Link"
                    onChange={e => setDeepLink(e.target.value)}
                    required
                    variant="outlined"
                    color="secondary"
                    type="text"
                    value={deepLink}
                    fullWidth
                    sx={{mb: 3}}
                 />
                  <Button sx={{mb: 4}} variant="outlined" color="secondary" onClick={handleDeepLinkClick}>Handle Deep Link</Button>
                  {response && <>          
                  <h3>Response from Server:</h3>

            <pre>{JSON.stringify(response, null, 2)}</pre></> 
}
</Box>
       
        </Container>

               </React.Fragment>
     );
}

export default App;
