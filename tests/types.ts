export type Optional<Type> = { [Key in keyof Type]?: Type[Key] };
