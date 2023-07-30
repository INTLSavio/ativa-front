import { GlobalStyles } from "@mui/material"; 

export function GlobalStyle() {
    return(
        <GlobalStyles 
            styles={{
                '*': {
                    padding: 0,
                    margin: 0,
                    boxSizing: 'border-box',
                    outline: 0,
                },
                'input, button, body': {
                    fontFamily: 'JetBrains Mono',
                },
                'body': {
                    backgroundColor: '#f0f0f0'
                }
            }}
        />
    );
}