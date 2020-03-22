import Autocomplete from '@material-ui/lab/Autocomplete';
import { VerbOption } from '../types';
import { TextField, createStyles, makeStyles, Theme, fade } from '@material-ui/core';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            backgroundColor: theme.palette.common.white, // fade(theme.palette.common.white, 0.90),
            '&:hover': {
                backgroundColor: theme.palette.common.white, // fade(theme.palette.common.white, 0.100),
            },
            borderRadius: theme.shape.borderRadius,
            width: "100%"
        },
        inputRoot: {
            "& .MuiOutlinedInput-notchedOutline": {
                borderWidth: 0
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
                borderWidth: 0
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderWidth: 0
            }
        }
    })
)

interface SearchBarProps {
    candidates: Array<VerbOption>
    onChange: any
    onInputChange: any
}

export function SearchBar({ onChange, onInputChange, candidates }: SearchBarProps) {
    const classes = useStyles()

    return (<Autocomplete<VerbOption>
        id="verb-input"
        autoHighlight
        clearOnEscape
        options={candidates}
        getOptionLabel={verb => verb.infinitive}
        onChange={onChange}
        onInputChange={onInputChange}
        classes={classes}
        size="small"
        renderInput={params => (
            <TextField {...params} variant="outlined" autoFocus={true} />
        )}
        noOptionsText="Aucun verbe trouvé"
        getOptionDisabled={option => {
            return option.infinitive === "..."
        }}
        filterOptions={(options: VerbOption[], state: object) => options}
    />)
}
