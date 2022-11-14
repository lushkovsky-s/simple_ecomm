export type ErrorResp = {
  error: string
}

type QueryVal = string | string[] | undefined

export const requiredParam = (val: QueryVal) => {
  if (!val) {
    throw new Error('Required param missed')
  }

  if (Array.isArray(val)) {
    throw new Error('Multiple params not allowed')
  }

  return val as string
}
