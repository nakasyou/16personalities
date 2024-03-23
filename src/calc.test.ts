import * as assert from '@std/assert'
import { toFloat8Array, dotProduct } from './calc.ts'
import { parsePersonalityLabel } from './personality.ts'

Deno.test('toFloat8Array and dotProduct', () => {
  const enfj = toFloat8Array(parsePersonalityLabel('ENFJ'))
  const enfp = toFloat8Array(parsePersonalityLabel('ISTP'))
  const res = dotProduct(enfj, enfp)

  assert.assertEquals(res, -1)
})
