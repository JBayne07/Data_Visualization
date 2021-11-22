import { Button, Slider, Box } from "@mui/material";
import { useEffect, useState } from "react";

export const Graph = () => {
    return(
        <div>
            <br/>
            <Button variant="outlined"  >
                Show Data
            </Button>

            <Button variant="outlined" >
                Hide Data
            </Button>
        </div>
    )
}