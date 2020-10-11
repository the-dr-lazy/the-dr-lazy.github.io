import { Language } from '~/Data'

export enum Direction {
    RTL = 'rtl',
    LTR = 'ltr',
}

const fromLanguagePattern = {
    [Language.FA]: Direction.RTL,
}

export function mkDirection(language: Language) {
    return fromLanguagePattern[language]
}
