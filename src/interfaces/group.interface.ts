export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export interface IGroup {
  readonly id: string;
  readonly name: string;
  readonly permission: Permission[];
}
