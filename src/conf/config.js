const conf={
    appwriteUrl:String(import.meta.env.VITE_ENDPOINT),
    appwriteProjectId:String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDataBaseId:String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwritecollectionId:String(import.meta.env.VITE_APPWRITE_COLLECTION_ID),
    appwriteDataBucketId:String(import.meta.env.VITE_APPWRITE_BUCKET_ID),


}

export default conf
