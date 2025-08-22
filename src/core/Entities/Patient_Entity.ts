export type TPatient = Readonly<{
  id: number;
  name: string;
  birthDate: Date;
  gender: Gender;
  address: string;
  phone: string;
  userId: number;
}>;

type Gender = 'MALE' | 'FEMALE';
