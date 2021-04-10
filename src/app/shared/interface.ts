export interface User {
  email?: string;
  password?: number;
  returnSecureToken?: boolean;
}

export interface FbAuthResponse {
  displayName?: string;
  email?: string;
  expiresIn?: string;
  idToken?: string;
  kind?: string;
  localId?: string;
  refreshToken?: string;
  registered?: boolean;
}

export interface Post{
  id?: string
  title?: string
  text?: string
  author?: string
  date?: Date
}