
import React from 'react'
import FavoriteIcon from '@material-ui/icons/Favorite';
import { Typography, Button, withStyles } from '@material-ui/core';

function Footer() {
    const StyledButton = withStyles({
        root: {
            background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
            borderRadius: 3,
            border: 0,
            color: 'white',
            boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
            display: 'inline-block',
            padding: 2,
            minHeight: 0,
            minWidth: 0,
        },
        label: {
            textTransform: 'capitalize',
        },
    })(Button);

    return (
        <Typography align="center">
            Made With <FavoriteIcon fontSize="small" /> by {""}
            <StyledButton href="https://vishakamin.github.io/"> Vishak Amin </StyledButton> {" "} using React.

        </Typography>
    )
}

export default Footer;
