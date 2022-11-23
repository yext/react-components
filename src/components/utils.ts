/**
 * Produces a union type from the enum passed as a generic which
 * consists of the enum values and the string literals of the enum.
 */
export type EnumOrLiteral<T extends string> = T | `${T}`;

/**
 * Constructs a type by omitting specified fields K from type T
 * while preserving the union structure.
 */
export type DistributiveOmit<T, K extends keyof T> = T extends unknown
  ? Omit<T, K>
  : never;
