import { VerbOption, TemplateConjugation, Templates, TenseConjugationModel } from "../types"

function parseTense(templateNode: HTMLTemplateElement, moodName: string, tenseName: string) {
  const moodNode = templateNode.getElementsByTagName(moodName).item(0)!
  const tenseNode = moodNode.getElementsByTagName(tenseName).item(0)!

  const tenseConjugation: TenseConjugationModel =
    Array.from(tenseNode.getElementsByTagName("p"))
      .map(pNode => {
        const iNodes = pNode.getElementsByTagName("i")
        return Array.from(iNodes).map(iNode => {
          return iNode.textContent!
        })
      })

  return tenseConjugation
}

export function parseTemplates(document: Document): Templates {
  const conjugations = new Map<string, TemplateConjugation>()

  const templates = document.getElementsByTagName("template")

  Array.from(templates).forEach(templateNode => {
    const templateName = templateNode.getAttribute("name")!

    const verbConjugation = {
      indicative: {
        present: parseTense(templateNode, "indicative", "present"),
        imperfect: parseTense(templateNode, "indicative", "imperfect"),
        future: parseTense(templateNode, "indicative", "future"),
        simplePast: parseTense(templateNode, "indicative", "simple-past")
      },
      subjunctive: {
        present: parseTense(templateNode, "subjunctive", "present"),
        imperfect: parseTense(templateNode, "subjunctive", "imperfect")
      },
      conditional: {
        present: parseTense(templateNode, "conditional", "present"),
      },
      imperative: {
        present: parseTense(templateNode, "imperative", "imperative-present")
      },
      participle: {
        present: parseTense(templateNode, "participle", "present-participle"),
        past: parseTense(templateNode, "participle", "past-participle")
      }
    }

    conjugations.set(templateName, verbConjugation)
  })

  return conjugations
}

export function parseVerbs(document: Document): Array<VerbOption> {
  const verbs = document.getElementsByTagName("v")

  const conjugations = Array.from(verbs).map((verb) => {
    const infinitive = verb.getElementsByTagName("i").item(0)!.textContent!
    const template = verb.getElementsByTagName("t").item(0)!.textContent!
    const aspirateH = verb.getElementsByTagName("aspirate-h").length !== 0

    return { infinitive, template, aspirateH }
  })

  return conjugations
}
