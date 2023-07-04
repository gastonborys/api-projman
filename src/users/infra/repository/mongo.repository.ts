import { UserEntity } from "../../domain/user.models";
import { UserRepository } from "../../domain/user.repository";
import { UserModel } from "../model/user.schema";

export class MongoRepository implements UserRepository {


    constructor(){}
    /*
     * Create User
     * @param user: UserEntity
     * @returns UserEntity | null
     */
    public async create(user: UserEntity): Promise<UserEntity | string> 
    {
        try {
            const newUser   = await UserModel.create(user) as UserEntity;

            return newUser;
        }
        catch(error)
        {
            console.log(error instanceof Error);
            return JSON.stringify(error);
        }
    }

    /*
     * Update User
     * @param user: UserEntity
     * @returns UserEntity | null
     */
    public async update(id: string, user: UserEntity): Promise<UserEntity | string>
    {
        user.updated_at     = new Date();

        const action        = await UserModel.updateOne({_id: id}, user);

        if (action.modifiedCount == 0)
            return `User ${id} not found`;

        return await UserModel.findById({_id: id}) as UserEntity;
    }

    /*
     * Delete User
     * @param email: UserEntity
     * @returns boolean
     */
    public async delete(id: string): Promise<boolean>
    {
        const action = await UserModel.deleteOne({_id: id});

        return action.deletedCount == 0 ? false : true;
    }

    /*
     * List Users
     * @returns ok: UserEntity[]
     */
    public async listUsers(): Promise<UserEntity[] | []> 
    {
        return await UserModel.find();
    }

    /*
     *
     * getUser
     * @param email: UserEntity
     * @returns UserEntity | null
     */
    public async getUser(id: string): Promise<UserEntity | null>
    {
        return await UserModel.findById(id);
    }

    /*
     * getCredentials
     * @param email: email String
     * @returns UserEntity | null
     */
    public async getCredentials(email: string): Promise<UserEntity | null> 
    {
        return await UserModel.findOne({email: email}).select(["_id", "email", "password", "isadmin", "enabled", "name", "lastname"]) as UserEntity;
    }

    /*
     * Update User Password
     * @param user: UserEntity
     * @returns UserEntity | null
     */
    public async changePassword(email: string, user: UserEntity): Promise<boolean | string>
    {
        user.updated_at     = new Date();

        const action        = await UserModel.updateOne({email: email}, user);

        if (action.modifiedCount == 0)
            return `User ${email} not found`;

        return true;
    }

    /*
     * emailExists
     * @param email: email String
     * @returns boolean
     */
    public async emailExists(email: string): Promise<boolean> 
    {
        return await UserModel.findOne({email: email}).countDocuments() > 0 ? true : false;
    }
}

