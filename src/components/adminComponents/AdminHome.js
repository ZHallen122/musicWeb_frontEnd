import React from "react";
import Grid from "@mui/material/Grid";

function AdminHome() {
    return (
        <div>
        <Grid container spacing={10}>
            <Grid item xs={3}>
                leftPart
            </Grid>

            <Grid item xs={5}>
                rightPart
            </Grid>
        </Grid>
        </div>
    );
}

export default AdminHome;