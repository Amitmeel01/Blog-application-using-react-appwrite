// import { Client, Account, ID } from 'appwrite';
// import conf from '../conf/config';

// export class AuthService {
//     client = new Client();
//     account;

//     constructor() {
//         this.client
//             .setEndpoint(conf.appwriteUrl)
//             .setProject(conf.appwriteProjectId);
//         this.account = new Account(this.client);
//     }
//     async createAccount({ email, password, name }) {
//         try {
//             const userId = ID.unique();
//             console.log('Generated User ID:', userId);  // Debug statement
//             const userAccount = await this.account.create(userId, email, password, name);
//             if (userAccount) {
//                 return this.login({ email, password });
//             } else {
//                 return userAccount;
//             }
//         } catch (err) {
//             console.log(err);
//             throw err;
//         }
//     }
    
//     async login({ email, password }) {
//         try {
//             const loginAccount = await this.account.createSession(email, password);
//             console.log('Login Account:', loginAccount);  // Debug statement
//             return loginAccount;
//         } catch (err) {
//             console.error("Error logging in:", err.message);
//             throw err;
//         }
//     }
    

//     async getCurrentAccount() {
//         try {
//             return await this.account.get();
//         } catch (err) {
//             console.log(err);
//             throw err;
//         }
//     }

//     async logout() {
//         try {
//             await this.account.deleteSessions();
//         } catch (err) {
//             console.log(err);
//             throw err;
//         }
//     }
// }

// const authService = new AuthService();
// export default authService;


// import conf from '../conf/config'
// import { Client, Account, ID } from "appwrite";


// export class AuthService {
//     client = new Client();
//     account;

//     constructor() {
//         this.client
//             .setEndpoint(conf.appwriteUrl)
//             .setProject(conf.appwriteProjectId);
//         this.account = new Account(this.client);
            
//     }

//     async createAccount({email, password, name}) {
//         try {
//             const userAccount = await this.account.create(ID.unique(), email, password, name);
//             if (userAccount) {
//                 // call another method
//                 return this.login({email, password});
//             } else {
//                return  userAccount;
//             }
//         } catch (error) {
//             throw error;
//         }
//     }

//     async login({email, password}) {
//         try {
//             const user= await this.account.createEmailPasswordSession(email, password);
//             return user;
//         } catch (error) {
//             throw error;
//         }
//     }

//     async getCurrentAccount() {
//         try {
//             return await this.account.get();
//         } catch (error) {
//             console.log("Appwrite serive :: getCurrentAccount :: error", error);
//         }

//         return null;
//     }

//     async logout() {

//         try {
//             await this.account.deleteSessions();
//         } catch (error) {
//             console.log("Appwrite serive :: logout :: error", error);
//         }
//     }
// }

// const authService = new AuthService();

// export default authService




import conf from '../conf/config';
import { Client, Account, ID } from 'appwrite';

export class AuthService {
    client = new Client();
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
    }

    async createAccount({ email, password, name }) {
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name);
            if (userAccount) {
                return this.login({ email, password });
            } else {
                return userAccount;
            }
        } catch (error) {
            console.error("Error creating account:", error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            const user = await this.account.createEmailPasswordSession(email, password);
            return user;
        } catch (error) {
            console.error("Error logging in:", error);
            throw error;
        }
    }

    async getCurrentAccount() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error("Appwrite service :: getCurrentAccount :: error", error);
            throw error;
        }
    }

    async logout() {
        try {
            await this.account.deleteSessions();
        } catch (error) {
            console.error("Appwrite service :: logout :: error", error);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;
