import React from "react";
import { Toolbar, Typography, Button, AppBar as MuiAppBar, makeStyles } from "@material-ui/core";

import { SearchBar } from "./SearchBar"


const useStyles = makeStyles({

});

interface AppBarProps {
    searchBar: React.ReactNode
}

export function AppBar({searchBar} : AppBarProps) {

    const classes = useStyles();

    return (
        <MuiAppBar position="static">
            <Toolbar>
                {searchBar}
            </Toolbar>
        </MuiAppBar>
    )
}
