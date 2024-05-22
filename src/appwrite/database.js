// import { Client, Account, ID, Databases, Storage, Query } from 'appwrite';
// import conf from '../conf/config';

// export class Service {
//     client = new Client();
//     storage;
//     databases;
//     account;

//     constructor() {
//         this.client
//             .setEndpoint(conf.appwriteUrl)
//             .setProject(conf.appwriteProjectId);
//         this.databases = new Databases(this.client);
//         this.storage = new Storage(this.client);
//         this.account = new Account(this.client);
//     }

//     async createPost({ title, slug, content, featuredImage, status, userId }) {
//         try {
//             const user = await this.account.get();
//             if (user) {
//                 return await this.databases.createDocument(
//                     conf.appwriteDataBaseId,
//                     conf.appwritecollectionId,
//                     slug,
//                     {
//                         title,
//                         slug,
//                         content,
//                         featuredImage,
//                         status,
//                         userId,
//                     }
//                 );
//             } else {
//                 throw new Error('User not authenticated');
//             }
//         } catch (err) {
//             console.error("Error creating post:", err.message);
//             throw err;
//         }
//     }

//     async updatePost(slug, { title, content, featuredImage, status }) {
//         try {
//             const user = await this.account.get();
//             if (user) {
//                 return await this.databases.updateDocument(
//                     conf.appwriteDataBaseId,
//                     conf.appwritecollectionId,
//                     slug,
//                     {
//                         title,
//                         content,
//                         featuredImage,
//                         status,
//                     }
//                 );
//             } else {
//                 throw new Error('User not authenticated');
//             }
//         } catch (err) {
//             console.error("Error updating post:", err.message);
//             throw err;
//         }
//     }

//     async deletePost(slug) {
//         try {
//             const user = await this.account.get();
//             if (user) {
//                 await this.databases.deleteDocument(
//                     conf.appwriteDataBaseId,
//                     conf.appwritecollectionId,
//                     slug,
//                 );
//                 return true;
//             } else {
//                 throw new Error('User not authenticated');
//             }
//         } catch (err) {
//             console.error("Error deleting post:", err.message);
//             return false;
//         }
//     }

//     async getPost(slug) {
//         try {
//             return await this.databases.getDocument(
//                 conf.appwriteDataBaseId,
//                 conf.appwritecollectionId,
//                 slug
//             );
//         } catch (err) {
//             console.error("Error getting post:", err.message);
//             return false;
//         }
//     }

//     async getPosts(queries = [Query.equal('status', 'active')]) {
//         try {
//             return await this.databases.listDocuments(
//                 conf.appwriteDataBaseId,
//                 conf.appwritecollectionId,
//                 queries,
//             );
//         } catch (err) {
//             console.error("Error getting posts:", err.message);
//             return false;
//         }
//     }

//     async uploadFile(file) {
//         try {
//             const user = await this.account.get();
//             if (user) {
//                 return await this.storage.createFile(
//                     conf.appwriteDataBucketId,
//                     ID.unique(),
//                     file
//                 );
//             } else {
//                 throw new Error('User not authenticated');
//             }
//         } catch (err) {
//             console.error("Error uploading file:", err.message);
//             return false;
//         }
//     }

//     async deleteFile(fileId) {
//         try {
//             const user = await this.account.get();
//             if (user) {
//                 await this.storage.deleteFile(
//                     conf.appwriteDataBucketId,
//                     fileId,
//                 );
//                 return true;
//             } else {
//                 throw new Error('User not authenticated');
//             }
//         } catch (err) {
//             console.error("Error deleting file:", err.message);
//             return false;
//         }
//     }

//     async getFilePreview(fileId) {
//         try {
//             return await this.storage.getFilePreview(
//                 conf.appwriteDataBucketId,
//                 fileId,
//             );
//         } catch (err) {
//             console.error("Error getting file preview:", err.message);
//             return false;
//         }
//     }
// }

// const service = new Service();
// export default service;

import { Client, Account, ID, Databases, Storage, Query } from 'appwrite';
import conf from '../conf/config';

export class Service {
    client = new Client();
    storage;
    databases;
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
        this.account = new Account(this.client);
    }

    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDataBaseId,
                conf.appwritecollectionId,
                ID.unique(),
                {
                    title,
                    slug,
                    content,
                    featuredImage,
                    status,
                    userId,
                }
            );
        } catch (err) {
            console.error("Error creating post:", err);
            throw err;
        }
    }

    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDataBaseId,
                conf.appwritecollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            );
        } catch (err) {
            console.error("Error updating post:", err);
            throw err;
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDataBaseId,
                conf.appwritecollectionId,
                slug
            );
            return true;
        } catch (err) {
            console.error("Error deleting post:", err);
            return false;
        }
    }

    async getPost(slug) {
        try {
            const post = await this.databases.getDocument(
                conf.appwriteDataBaseId,
                conf.appwritecollectionId,
                slug
            );
          
            return post;
        } catch (err) {
            console.error("Error getting post:", err);
            return false;
        }
    }

    async getPosts(queries = [Query.equal('status', 'active')]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDataBaseId,
                conf.appwritecollectionId,
                queries
            );
        } catch (err) {
            console.error("Error getting posts:", err);
            return false;
        }
    }

    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteDataBucketId,
                ID.unique(),
                file
            );
        } catch (err) {
            console.error("Error uploading file:", err);
            return false;
        }
    }

    async deleteFile(fileId) {
        try {
            await this.storage.deleteFile(
                conf.appwriteDataBucketId,
                fileId
            );
            return true;
        } catch (err) {
            console.error("Error deleting file:", err);
            return false;
        }
    }

    async getFilePreview(fileId) {
        try {
            return await this.storage.getFilePreview(
                conf.appwriteDataBucketId,
                fileId,
            );
        } catch (err) {
            console.log("Error getting file preview:", err);
            throw err;
        }
    }
}

const service = new Service();

export default service;
