export interface MemberEntity {
  id: string;
  dateOfBirth: Date;
  imageUrl?: string;
  userName: string;
  description?: string;
  created: Date;
  lastActive: Date;
  gender: string;
  city: string;
  country: string;
}

export interface Photo {
  id: number;
  url: string;
  isMain: boolean;
  publicId?: null;
  memberId: string;
}
