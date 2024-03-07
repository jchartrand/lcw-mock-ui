import React, {useState} from "react";
import { TextField, Button, AppBar, Toolbar, Divider, Chip } from "@mui/material";
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

                  <h3>Constructed DIDAuth:</h3>
{didAuth &&
            <pre>{JSON.stringify(didAuth, null, 2)}</pre>
}         


        
      <Divider variant="fullWidth" sx={{ opacity: 5 }} />

<h2>OR, Mock the Wallet DIDAuth call for a deeplink</h2>

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
           
                  <h3>Response from Server:</h3>
{response &&
            <pre>{JSON.stringify(response, null, 2)}</pre>
}

       
        </Container>

               </React.Fragment>
     );
}

export default App;
