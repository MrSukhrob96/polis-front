import { User } from "../../../models/user";
export type AuthProviderPropsType = {
  children: React.ReactNode;
};

export interface InitialStateType {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
  isError: boolean;
  message: string | null;
  login: (user: any) => void;
  logout: () => void;
  me: () => void;
}
