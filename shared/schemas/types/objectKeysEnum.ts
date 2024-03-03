import { z } from "zod"

const keys = <K extends string> ( r: Record<K, any> ): K[] => Object.keys( r ) as K[]

export function ObjectKeysEnum<K extends string> ( obj: Record<K, any> ) {
    return z.enum( [ keys( obj )[ 0 ], ...keys( obj ) ] )
}
