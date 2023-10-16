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
  description: string;
  imageUrl: string;
  musicUrl: string;
  _count: { musicViews: number };
  authorId: string;
  letter?: { verses: [[{ time: number; word: string }]] };
  comment: Comment[]
};
export type Comment = {
  id: string;
  user: { image: string; username: string; }
  comment: string;
  musicId: string;
  userId: string;
}
export type FavoriteMusics = {
  count: number;
  music: {
    id: string;
    name: string;
    authorName: string;
    imageUrl: string;
    musicUrl: string;
    authorId: string;
  };
};

export type Artist = {
  id: string;
  image: string | null;
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
export type Playlist = {
  id: string;
  name: string;
};
