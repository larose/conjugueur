export interface VerbOption {
  infinitive: string
  template: string
  aspirateH: boolean
}

export type PersonConjugation = Array<string>
export type TenseConjugationModel = Array<PersonConjugation>

interface Indicative {
  present: TenseConjugationModel
  imperfect: TenseConjugationModel
  future: TenseConjugationModel
  simplePast: TenseConjugationModel
}

interface Subjunctive {
  present: TenseConjugationModel
  imperfect: TenseConjugationModel
}

interface Conditional {
  present: TenseConjugationModel
}

interface Imperative {
  present: TenseConjugationModel
}

interface Participle {
  present: TenseConjugationModel
  past: TenseConjugationModel
}

export interface TemplateConjugation {
  indicative: Indicative
  subjunctive: Subjunctive
  conditional: Conditional
  imperative: Imperative
  participle: Participle
}

export type Templates = Map<string, TemplateConjugation>

export interface VerbConjugation {
  verbOption: VerbOption
  prefix: string
  templateConjugation: TemplateConjugation
}
