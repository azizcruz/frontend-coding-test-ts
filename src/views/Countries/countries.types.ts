/* eslint-disable no-use-before-define */

interface Continent {
  code: string
  countries: Country[]
  name: string
}

interface Language {
  code: string
  name: string
  native: string
  rtl: boolean
}

interface State {
  code?: string | null
  country: Country
  name: string
}

interface Subdivision {
  code: string
  emoji?: string | null
  name: string
}

export interface Country {
  awsRegion: string
  capital?: string | null
  code: string
  continent: Continent
  currencies: string[]
  currency?: string | null
  emoji: string
  emojiU: string
  languages: Language[]
  name: string
  native: string
  phone: string
  phones: string[]
  states: State[]
  subdivisions: Subdivision[]
}

export interface ListCountry {
  code: string
  name: string
  emoji: string
}
