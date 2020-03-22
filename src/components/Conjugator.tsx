import { useState, useEffect } from "react"
import { VerbOption, Templates, VerbConjugation } from "../types"
import { parseVerbs, parseTemplates } from "./ConjugationParser"
import React from "react"
import { SearchBar } from "./SearchBar"
import { Conjugation } from "./Conjugation"
import { AppBar } from "./AppBar"

function stripDiacritics(string: string) {
    return typeof string.normalize !== 'undefined'
        ? string.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
        : string;
}

function truncateOptions(options: Array<VerbOption>): Array<VerbOption> {
    if (options.length < 8) {
        return options
    }

    const truncatedOptions = options.slice(0, 7)
    return truncatedOptions.concat([{ infinitive: "...", template: "", aspirateH: false }])
}

function filterOptions(options: Array<VerbOption>, input: string): Array<VerbOption> {
    const normalizedInput = stripDiacritics(input.trim().toLowerCase());
    if (normalizedInput.length === 0) {
        return truncateOptions(options)
    }

    const decoratedOptions = options.map(option => {
        const normalizedCandidate = stripDiacritics(option.infinitive.trim().toLowerCase())
        const indexMatch = normalizedCandidate.indexOf(normalizedInput)

        return {
            option,
            indexMatch
        }
    })

    const filteredDecoratedOptions = decoratedOptions.filter(decoratedOption => {
        return decoratedOption.indexMatch > -1
    })
    filteredDecoratedOptions.sort((a, b) => {
        if (a.indexMatch !== b.indexMatch) {
            return a.indexMatch - b.indexMatch
        }

        return a.option.infinitive.length - b.option.infinitive.length
    })

    const filteredOptions = filteredDecoratedOptions.map(decoratedOption => decoratedOption.option)

    return truncateOptions(filteredOptions)
}

async function fetchVerbs() {
    const response = await fetch("verbs-fr.xml")
    const responseBody = await response.text()
    const domparser = new DOMParser()
    const document = domparser.parseFromString(responseBody, "application/xml")
    return parseVerbs(document)
}

async function fetchTemplates() {
    const response = await fetch("conjugation-fr.xml")
    const responseBody = await response.text()
    const domparser = new DOMParser()
    const document = domparser.parseFromString(responseBody, "application/xml")
    return parseTemplates(document)
}

function computePrefix(infinitive: string, templateName: string): string {
    const seperatorIndex = templateName.indexOf(":")
    const suffixSize = templateName.length - seperatorIndex - 1
    return infinitive.slice(0, infinitive.length - suffixSize)
}

export function Conjugator() {
    const [verbOption, setVerbOption] = useState<VerbOption | null>(null)
    const [input, setInput] = useState<string>("")
    const [allVerbs, setAllVerbs] = useState<Array<VerbOption>>([])
    const [candidates, setCandidates] = useState<Array<VerbOption>>([])
    const [templates, setTemplates] = useState<Templates>(new Map())
    const [verbConjugation, setVerbConjugation] = useState<VerbConjugation | null>(null)

    function onChange(event: React.ChangeEvent<{}>, value: VerbOption) {
        setVerbOption(value)
    }

    function onInputChange(event: React.ChangeEvent<{}>, value: string, reason: string) {
        setInput(value)
    }

    useEffect(() => {
        (async () => {
            const verbs = await fetchVerbs()
            setAllVerbs(verbs)
        })()
    }, [])

    useEffect(() => {
        (async () => {
            const templates = await fetchTemplates()
            setTemplates(templates)
        })()
    }, [])

    useEffect(() => {
        const candidates = filterOptions(allVerbs, input)
        setCandidates(candidates)
    }, [input, allVerbs])

    useEffect(() => {
        if (verbOption === null) {
            setVerbConjugation(null)
            return
        }

        const templateConjugation = templates.get(verbOption.template)
        if (templateConjugation === undefined) {
            setVerbConjugation(null)
            return
        }

        setVerbConjugation({
            verbOption,
            prefix: computePrefix(verbOption.infinitive, verbOption.template),
            templateConjugation,

        })
    }, [verbOption, templates])

    const searchBar = <SearchBar
        onChange={onChange}
        onInputChange={onInputChange}
        candidates={candidates}
    />

    if (verbConjugation === null) {
        return (
            <div>
                <AppBar searchBar={searchBar} />
            </div>
        )
    }

    return (
        <div>
            <AppBar searchBar={searchBar} />
            <Conjugation verbConjugation={verbConjugation} />
        </div>
    )
}
