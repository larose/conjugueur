import React from "react"
import { Grid, TableContainer, Table, TableBody, TableRow, TableCell, makeStyles } from "@material-ui/core"
import { Pronouns } from "../pronouns";
import { TenseConjugationModel } from "../types"

function serializePronoun(pronouns: Array<Array<String>>, index: number): string {
    return pronouns[index].join(", ")
}

interface TenseConjugationProps {
    tenseName: string
    tenseConjugation: TenseConjugationModel
    pronouns: Pronouns
    prefix: string
}

export function TenseConjugation({ tenseName, tenseConjugation, pronouns, prefix }: TenseConjugationProps) {
    const useStyles = makeStyles({
        cell: {
            borderBottom: "none"
        },
    });

    const classes = useStyles();

    return (
        <Grid item>
            <h3>{tenseName}</h3>
            <TableContainer>
                <Table size="small">
                    <TableBody>
                        {tenseConjugation.map((personConjugation, index) => {
                            return <TableRow key={index}>
                                <TableCell className={classes.cell} component="th" scope="row">
                                    {serializePronoun(pronouns, index)}
                                </TableCell>
                                <TableCell className={classes.cell} align="left">
                                    {personConjugation.map(suffix => prefix + suffix).join(", ")}
                                </TableCell>
                            </TableRow>
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </Grid>
    )
}
