export interface IHashCompare {
  compare: (value: string, hashed: string) => Promise<boolean>
}
