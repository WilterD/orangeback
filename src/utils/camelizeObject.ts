import { camelCase, cloneDeep } from 'lodash'

type ObjectOrArray<T> = T[] | { [key: string]: T | ObjectOrArray<T> }

function performCamelize<T> (obj: ObjectOrArray<T>): ObjectOrArray<T> {
  if (Array.isArray(obj)) {
    return obj.map((v) => performCamelize(v as any)) as T[]
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce<{ [key: string]: T | ObjectOrArray<T> }>(
      (result, key): any => {
        const value = obj[key]
        if (value instanceof Date) {
          return { ...result, [camelCase(key)]: value.toISOString() }
        } else if (typeof value === 'object') {
          return { ...result, [camelCase(key)]: performCamelize(value as any) }
        } else {
          return { ...result, [camelCase(key)]: value }
        }
      },
      {}
    )
  } else {
    return obj as any
  }
}

export default function camelizeObject<T> (obj: ObjectOrArray<T>): ObjectOrArray<T> {
  return performCamelize(cloneDeep(obj))
}
