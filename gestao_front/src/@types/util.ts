export type Unpacked<T> = T extends (infer U)[]
  ? U
  : T extends (...args: any) => infer U
  ? U
  : T extends Promise<infer U>
  ? U
  : T;

export type WithOptional<T, K extends keyof T> = Omit<T, K> & {
  [key in K]?: T[K];
};

export type WithRequired<T, K extends keyof T> = Omit<T, K> & {
  [key in K]: T[K];
};
