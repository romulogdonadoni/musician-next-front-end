export type Album = {
  id: string;
  name: string;
  authorName: string;
  authorId: string;
  imageUrl: string;
  description: string;
  music: Music[];
};

export type Music = {
  id: string;
  name: string;
  authorName: string;
  imageUrl: string;
  musicUrl: string;
  _count: { musicViews: number };
  authorId: string;
};
export type Artist = {
  id: string;
  image: string;
  username: string;
};
export type LoginFormData = {
  email: string;
  password: string;
};
export type RegisterFormData = {
  email: string;
  username: string;
  password: string;
  role: string;
};
export type PlayList = {
  name: string;
};
