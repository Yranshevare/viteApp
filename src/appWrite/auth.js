import conf from "../conf/conf";
import { Client,Account,ID } from "appwrite";

export class AuthService{
    client = new Client();
    account;

    constructor(){  
        this.client
            .setEndpoint(conf.appWriteUrl)
            .setProject(conf.appWriteProjectId);
        this.account = new Account(this.client) //we want to create the account only when the object is get called         
    }

    //all the services from the app write
    async createAccount({email,password,name}){
        try{
            const userAccount = await this.account.create(ID.unique(),email,password,name);     //.create is use to create new account
            if(userAccount){        //check if the account is actually exist
                this.login({email,password})        //if user present then login the user
            }else{
                return userAccount      //if user account is not exist then return whatever is return by .create function 
            }
        }catch(error){
            throw error
        }
    }

    async login({email,password}){
        try{
            return await this.account.createEmailPasswordSession(email, password);
        }catch(error){
            throw error
        }
    }

    async getCurrentUser(){
        try{
            return await this.account.get()
        }catch (error){
            console.log("Appwrite services :: getCurrentUser :: error ", error);           
        }
        return null;    //if account doest get return null
    }

    async logout(){
        try {
            await this.account.deleteSessions()    
        } catch (error) {
            console.log("appwrite service :; logout :: error",error);           
        }
    }
}

const authService = new AuthService()
export default authService