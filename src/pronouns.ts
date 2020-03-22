export type Pronouns = Array<Array<String>>

export const NON_ELIDED_PRONOUNS: Pronouns = [
    ["je"],
    ["tu"],
    ["il", "elle"],
    ["nous"],
    ["vous"],
    ["ils", "elles"]
]

export const ELIDATED_PRONOUNS: Pronouns = [
    ["j'"],
    ["tu"],
    ["il", "elle"],
    ["nous"],
    ["vous"],
    ["ils", "elles"]
]

export const NON_ELIDED_SUBJUNCTIVE_PRONOUNS: Pronouns = [
    ["que je"],
    ["que tu"],
    ["qu'il", "qu'elle"],
    ["que nous"],
    ["que vous"],
    ["qu'ils", "qu'elles"]
]

export const ELIDATED_SUBJUNCTIVE_PRONOUNS: Pronouns = [
    ["que j'"],
    ["que tu"],
    ["qu'il", "qu'elle"],
    ["que nous"],
    ["que vous"],
    ["qu'ils", "qu'elles"]
]

export const NO_PRONOUNS: Pronouns = [
    [],
    [],
    [],
    []
]
