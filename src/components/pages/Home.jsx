// import React, { useState, useEffect } from 'react';
// import Container from '../container/Container';
// import PostCard from '../PostCard';
// import appwriteService from '../../appwrite/database';
// import { useSelector } from 'react-redux';

// function Home() {
//     const [posts, setPosts] = useState([]);
    

//     useEffect(() => {
//         appwriteService.getPosts().then((posts) => {
//             if (posts) {
//                 setPosts(posts.documents);
               
//             }
//         });
//     }, []);

//     if ( posts.length === 0) {
//         return (
//             <div className='w-full py-8 mt-4 text-center'>
//                 <Container>
//                     <div className='flex flex-wrap'>
//                         <div className='p-2 w-full'>
//                             <h1 className='text-2xl font-bold hover:text-gray-500'>Currently No Post here</h1>
//                         </div>
//                     </div>
//                 </Container>
//             </div>
//         );
//     } else {
//         return (
//             <div className='w-full py-8'>
//                 <Container>
//                     <div className='flex flex-wrap'>
//                         {posts.map((post) => (
//                             <div key={post.$id} className='p-2 w-1/4'>
//                                 <PostCard {...post} />
//                             </div>
//                         ))}
//                     </div>
//                 </Container>
//             </div>
//         );
//     }
// }

// export default Home;


import React, { useState, useEffect } from 'react';
import Container from '../container/Container';
import PostCard from '../PostCard';
import appwriteService from '../../appwrite/database';
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const user = useSelector(state => state.auth.userData); // Assume auth state has userData

    useEffect(() => {
        if (user) {
            setIsLoggedIn(true);
            appwriteService.getPosts().then((posts) => {
                if (posts) {
                    setPosts(posts.documents);
                }
            });
        } else {
            setIsLoggedIn(false);
            setPosts([]);
        }
    }, [user]);

    if (!isLoggedIn) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold hover:text-gray-500'>Login to read posts</h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    if (isLoggedIn && posts.length === 0) {
        return (
            <div className='w-full py-8 mt-4 text-center'>
                <Container>
                    <div className='flex flex-wrap'>
                        <div className='p-2 w-full'>
                            <h1 className='text-2xl font-bold hover:text-gray-500'>Currently No Post here</h1>
                        </div>
                    </div>
                </Container>
            </div>
        );
    }

    return (
        <div className='w-full h-full py-8'>
            <Container>
                <div className='flex flex-wrap '>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full sm:w-1/2 lg:w-1/4 xs:w-1'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default Home;
