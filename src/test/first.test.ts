const sum = (a:any, b:any) => {
    return a + b
}

test('sum for a + b', () => {
    expect(sum(1,2)).toBe(3)
  })