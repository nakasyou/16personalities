/**
 * Personalities
 * @module
 */

/**
 * Personalities Object
 * @public
 */
export interface Personality {
  /**
   * Personalities data by number
   * all data is (-1.0 <= x <= 1.0)
   */
  data: {
    /**
     * Extraversion: plus value
     * Introversion: minus value
     */
    energy: number
    /**
     * N: plus
     * Sensing: minus
     */
    mind: number
    /**
     * Thinking: plus
     * Feeling: minus
     */
    nature: number
    /**
     * Judging: plus
     * Perceiving: minus
     */
    tactics: number
    /**
     * Assertive: Plus
     * Turbulent: Minus
     */
    identity: number | null
  }
}

type EnergyChar = 'E' | 'I'
type MindChar = 'N' | 'S'
type NatureChar = 'T' | 'F'
type TacticsChar = 'J' | 'P'
type IdentityChar = 'A' | 'T'

/**
 * Personality label type
 * e.g. `ENFP-T`, `ENFP`
 * @public
 */
export type PersonalityLabel =
  | `${EnergyChar}${MindChar}${NatureChar}${TacticsChar}-${IdentityChar}`
  | `${EnergyChar}${MindChar}${NatureChar}${TacticsChar}`

const personalityLabelRegExp = /^(E|I)(N|S)(F|T)(J|P)(-(A|T))?$/

/**
 * You can get that is label valid
 * @param label String
 * @returns Is label valid
 * @public
 */
export const validPersonalityLabel = (
  label: string,
): label is PersonalityLabel => personalityLabelRegExp.test(label)

/**
 * Parse personality label
 * @param label valid label
 * @public
 */
export const parsePersonalityLabel = (label: PersonalityLabel): Personality => {
  const energy = label[0] === 'E' ? 1 : -1
  const mind = label[1] === 'N' ? 1 : -1
  const nature = label[2] === 'T' ? 1 : -1
  const tactics = label[3] === 'J' ? 1 : -1
  const identity = label[5] ? (label[5] === 'A' ? 1 : -1) : null

  return {
    data: {
      energy,
      mind,
      nature,
      tactics,
      identity,
    },
  }
}

/**
 * Create personality label from personality
 * @param personality Personality
 * @returns Label
 */
export const createPersonalityLabel = (personality: Personality): PersonalityLabel => {
  const energy = personality.data.energy > 0 ? 'E' : 'I'
  const mind = personality.data.mind > 0 ? 'N' : 'S'
  const nature = personality.data.nature > 0 ? 'T' : 'F'
  const tactics = personality.data.tactics > 0 ? 'J' : 'P'
  const identity = personality.data.identity
    ? (personality.data.identity > 0 ? '-A' : '-T')
    : ''
  return `${energy}${mind}${nature}${tactics}${identity}`
}
