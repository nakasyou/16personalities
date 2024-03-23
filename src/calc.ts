/**
 * Utils of to calc
 * @module
 */
import { createPersonalityLabel } from './personality.ts'
import type { Personality, PersonalityLabel } from './personality.ts'

/**
 * Personality to Float64Array
 * @param personality parsonality
 * @returns [energy, mind, nature, tactics]
 * @public
 */
export const toFloat8Array = (personality: Personality): Float64Array =>
  new Float64Array([
    personality.data.energy,
    personality.data.mind,
    personality.data.nature,
    personality.data.tactics,
    ...(personality.data.identity ? [personality.data.identity] : []),
  ])

export const vecToPersonality = (
  vec: number[] | Float64Array,
): Personality => ({
  data: Object.fromEntries([...vec].map((item, i) => [
    ['energy', 'mind', 'nature', 'tactics', 'identity'][i],
    item,
  ])) as Personality['data'],
})

/**
 * Compute the dot product of two personalities
 * @param a personality 1
 * @param b personality 2
 * @returns dot product of two personalities
 * @public
 */
export const dotProduct = (
  a: Float64Array | Personality,
  b: Float64Array | Personality,
): number => {
  if (!(a instanceof Float64Array)) {
    a = toFloat8Array(a)
  }
  if (!(b instanceof Float64Array)) {
    b = toFloat8Array(b)
  }
  const len = Math.min(a.length, b.length)
  let product = 0
  for (let i = 0; i < len; i++) {
    product += a[i] * b[i]
  }
  return (product - len) / (2 * len)
}

/**
 * Calc all personality labels
 * @returns All personalities label
 */
export const calcAllPersonalityLabels = (): PersonalityLabel[] =>
  [[-1], [1]]
    .flatMap((e) => [[...e, -1], [...e, 1]])
    .flatMap((e) => [[...e, -1], [...e, 1]])
    .flatMap((e) => [[...e, -1], [...e, 1]])
    .map((e) => createPersonalityLabel(vecToPersonality(e)))
