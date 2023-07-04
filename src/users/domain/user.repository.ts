import { UserEntity } from "./user.models";


export interface UserRepository {
    
    create(user: UserEntity): Promise<UserEntity | string>;

    update(id: string, user: UserEntity): Promise<UserEntity | string>;
    
    delete(id: string): Promise<boolean>;
    
    getUser(id: string): Promise<UserEntity | null>;
    
    getCredentials(id: string): Promise<UserEntity | null>;

    changePassword(email: string, user: UserEntity): Promise<boolean | string>;
    
    listUsers(order?: Object): Promise <UserEntity[] | []>;

    emailExists(email: string): Promise<boolean>;
    
}
