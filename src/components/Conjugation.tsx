import { makeStyles, Grid, TableContainer, Table, TableBody, TableCell, TableRow } from "@material-ui/core";
import React from "react";
import { VerbConjugation } from "../types";
import { NON_ELIDED_PRONOUNS, NO_PRONOUNS, ELIDATED_PRONOUNS, ELIDATED_SUBJUNCTIVE_PRONOUNS, NON_ELIDED_SUBJUNCTIVE_PRONOUNS } from "../pronouns";
import { TenseConjugation } from "./TenseConjugation";

const vowels = ['a', 'e', 'i', 'o', 'u', 'y'];

function useElidedPronouns(infinitive: string, aspiredH: boolean) {
  if (vowels.includes(infinitive[0])) {
    return true
  }

  if (infinitive[0] != "h") {
    return false
  }

  return !aspiredH
}

interface ConjugationProps {
  verbConjugation: VerbConjugation
}

export function Conjugation({ verbConjugation }: ConjugationProps) {
  const elidedPronouns = useElidedPronouns(verbConjugation.verbOption.infinitive, verbConjugation.verbOption.aspirateH)
  const basicPronouns = elidedPronouns ? ELIDATED_PRONOUNS : NON_ELIDED_PRONOUNS
  const subjunctivePronouns = elidedPronouns ? ELIDATED_SUBJUNCTIVE_PRONOUNS : NON_ELIDED_SUBJUNCTIVE_PRONOUNS

  return (
    <div>
      <h1>{verbConjugation.verbOption.infinitive}</h1>

      <Grid
        container
        direction="row"
        justify="flex-start"
        alignItems="flex-start"
        spacing={4}
      >
        <TenseConjugation
          tenseName={"Indicatif présent"}
          tenseConjugation={verbConjugation.templateConjugation.indicative.present}
          prefix={verbConjugation.prefix}
          pronouns={basicPronouns}
        />

        <TenseConjugation
          tenseName={"Indicatif imparfait"}
          tenseConjugation={verbConjugation.templateConjugation.indicative.imperfect}
          prefix={verbConjugation.prefix}
          pronouns={basicPronouns}
        />

        <TenseConjugation
          tenseName={"Indicatif futur"}
          tenseConjugation={verbConjugation.templateConjugation.indicative.future}
          prefix={verbConjugation.prefix}
          pronouns={basicPronouns}
        />

        <TenseConjugation
          tenseName={"Indicatif passé simple"}
          tenseConjugation={verbConjugation.templateConjugation.indicative.simplePast}
          prefix={verbConjugation.prefix}
          pronouns={basicPronouns}
        />

        <TenseConjugation
          tenseName={"Conditionel présent"}
          tenseConjugation={verbConjugation.templateConjugation.conditional.present}
          prefix={verbConjugation.prefix}
          pronouns={basicPronouns}
        />

        <TenseConjugation
          tenseName={"Subjonctif présent"}
          tenseConjugation={verbConjugation.templateConjugation.subjunctive.present}
          prefix={verbConjugation.prefix}
          pronouns={subjunctivePronouns}
        />

        <TenseConjugation
          tenseName={"Subjonctif imparfait"}
          tenseConjugation={verbConjugation.templateConjugation.subjunctive.imperfect}
          prefix={verbConjugation.prefix}
          pronouns={subjunctivePronouns}
        />

        <TenseConjugation
          tenseName={"Impératif présent"}
          tenseConjugation={verbConjugation.templateConjugation.imperative.present}
          prefix={verbConjugation.prefix}
          pronouns={NO_PRONOUNS}
        />

        <TenseConjugation
          tenseName={"Participe présent"}
          tenseConjugation={verbConjugation.templateConjugation.participle.present}
          prefix={verbConjugation.prefix}
          pronouns={NO_PRONOUNS}
        />

        <TenseConjugation
          tenseName={"Participe passé"}
          tenseConjugation={verbConjugation.templateConjugation.participle.past}
          prefix={verbConjugation.prefix}
          pronouns={NO_PRONOUNS}
        />

      </Grid>

    </div >
  )
}
