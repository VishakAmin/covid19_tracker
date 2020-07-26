import React from 'react'
import { Card, CardContent, Typography } from '@material-ui/core'
import './InfoBox.css'

function InfoBox({ title, cases, active, isRed, isBlack, total, ...props }) {
    return (

        <Card
            onClick={props.onClick} className={`infoBox ${active && "infoBox--selected"} ${active && isRed && 'infoBox--red'} ${active && isBlack && 'infoBox--black'}`}>
            <CardContent>
                <Typography className="infoBox__title" color="textSecondary">
                    {title}
                </Typography>

                <h2 className={`infoBox__cases ${!isRed && "infoBox__cases--green"} ${isBlack && "infoBox__cases--black"}`}>{cases}</h2>

                <Typography className="info__total" color="textSecondary">
                    {total} Total
            </Typography>

            </CardContent>
        </Card>
    )
}

export default InfoBox
