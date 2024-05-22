import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import appWriteService from '../appwrite/database';

function PostCard({ $id, title, featuredImage }) {
    const [imageSrc, setImageSrc] = useState(null);

    useEffect(() => {
        const getImageSrc = async () => {
            try {
                const previewUrl = await appWriteService.getFilePreview(featuredImage);
                setImageSrc(previewUrl);
            } catch (error) {
                console.error('Error fetching image preview:', error);
            }
        };

        getImageSrc();
    }, [featuredImage]);

    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full h-48 '>
                    {imageSrc && <img src={imageSrc} alt={title} className='object-cover w-full h-full rounded-xl' />}
                    {!imageSrc && <div className='placeholder-image w-full h-full rounded-xl bg-gray-200' />}
                </div>
                <h2 className='text-xl font-bold px-0 pt-2 text-center mt-2'>{title}</h2>
            </div>
        </Link>
    );
}

export default PostCard;
