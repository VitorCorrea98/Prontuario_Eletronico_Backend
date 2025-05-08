export type TPatient = Readonly<{
	name: string;
	birthDate: Date;
	gender: Gender;
	address: string;
	phone: string;
}>;

type Gender = "MALE" | "FEMALE";
