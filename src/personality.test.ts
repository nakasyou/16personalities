import * as assert from '@std/assert'
import * as personality from './personality.ts'

Deno.test('validPersonalityLabel', () => {
  const validPersonalities = [
    'ENFP',
    'ENFP-T'
  ]
  for (const validPersonality of validPersonalities) {
    assert.assertEquals(
      personality.validPersonalityLabel(validPersonality),
      true
    )
  }
  const invalidParsonalities = [
    'A',
    'ENFP--T'
  ]
  for (const invalidPersonality of invalidParsonalities) {
    assert.assertEquals(
      personality.validPersonalityLabel(invalidPersonality),
      false
    )
  }
})

Deno.test('parsePersonalityLabel', () => {
  const parsonalities: [
    personality.PersonalityLabel,
    personality.Personality['data']
  ][] = [
    [
      'ENFJ',
      {
        energy: 1,
        mind: -1,
        nature: -1,
        tactics: 1,
        identity: null
      }
    ]
  ]
  for (const [label, parsonality] of parsonalities) {
    assert.assertEquals(
      personality.parsePersonalityLabel(label),
      {
        data: parsonality
      }
    )
  }
})
