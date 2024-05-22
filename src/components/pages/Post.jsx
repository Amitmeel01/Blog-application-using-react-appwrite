import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appWriteService from '../../appwrite/database';
import Button from "../header/Button";
import Container from '../container/Container';
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        const fetchData = async () => {
            try {
                const fetchedPost = await appWriteService.getPost(slug);
                if (fetchedPost) {
                    console.log('Fetched post:', fetchedPost); // Log the entire post object
                    setPost(fetchedPost);
                    const imageUrl = await appWriteService.getFilePreview(fetchedPost.featuredImage);
                    setImageUrl(imageUrl.href); // Ensure you get the correct URL string
                } else {
                    navigate("/all-posts");
                }
            } catch (error) {
                console.error('Error fetching post:', error);
                navigate("/all-posts");
            }
        };

        if (slug) {
            fetchData();
        }

        return () => {
            // Clean up function if needed
        };
    }, [slug, navigate]);

    const deletePost = async () => {
        try {
            const deleted = await appWriteService.deletePost(post.$id);
            if (deleted) {
                await appWriteService.deleteFile(post.featuredImage);
                navigate("/all-posts");
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    // const renderContent = (content) => {
    //     if (!content) {
    //         return <p>No content available</p>;
    //     }
    //     try {
    //         return parse(content); // Ensure this correctly parses and renders the HTML content
    //     } catch (error) {
    //         console.error('Error parsing content:', error);
    //         return <p>Error displaying content</p>;
    //     }
    // };

    return post ? (
        <div className="py-12 w-100">
            <Container>
                <div className="w-full h-[32rem] flex justify-center mb-4 relative border rounded-xl pb-3 ">
                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt={post.title}
                            className="rounded-xl w-full h-[32rem]"
                        />
                    )}
                    {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button bgColor="bg-green-500" className="mr-3">
                                    Edit
                                </Button>
                            </Link>
                            <Button bgColor="bg-red-500" onClick={deletePost}>
                                Delete
                            </Button>
                        </div>
                    )}
                </div>
                <div className="w-full mb-6 pl-10 pt-2">
                    <h1 className="text-2xl font-bold"><span className="text-blue-500 text-800">Title</span> : {post.title}</h1>
                </div>
                <div className="browser-css pl-10">
                     
                     <h1 className="text-xl font-bold">
                        <span className="text-blue-500 text-800 pb-3">Content : </span> &nbsp; 
                      {parse(post.content)}
                         
                    </h1>
                   
                </div>
            </Container>
        </div>
    ) : null;
}
