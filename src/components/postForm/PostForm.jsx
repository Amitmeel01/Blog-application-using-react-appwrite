import React, { useCallback, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Button from '../header/Button';
import Input from '../header/Input';
import Select from '../Select';
import Rte from '../Rte';
import appWriteService from '../../appwrite/database';

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || '',
            slug: post?.slug || '',
            content: post?.content || '',
            status: post?.status || 'active',
        }
    });

    const navigate = useNavigate();
    const userData = useSelector(state => state.auth.userData);

   

    const submit = async (data) => {
        try {
            if (post) {
                const file = data.image[0] ? await appWriteService.uploadFile(data.image[0]) : null;
                if (file) {
                    await appWriteService.deleteFile(post.featuredImage);
                }
                const updatedPost = await appWriteService.updatePost( post.$id,{  //, yeh { se pehle aaega 
                    ...data,
                    featuredImage: file ? file.$id : post.featuredImage,
                });
                if (updatedPost) {
                    // navigate(`/post/${updatedPost.$id}`);
                    navigate('/all-posts')
                }
            } else {
                const file = await appWriteService.uploadFile(data.image[0]);
                if (file) {
                    const fileId = file.$id;
                    const newPost = await appWriteService.createPost({
                        ...data,
                        userId: userData.$id,
                        featuredImage: fileId,
                    });
                    if (newPost) {
                        // navigate(`/post/${newPost.$id}`);
                        navigate('/all-posts')
                    }
                }
            }
        } catch (err) {
            console.error("Error submitting post:", err);
        }
    };

    const slugTransform = useCallback((value) => {
        if (value && typeof value === 'string') {
            return value
                .trim()
                .toLowerCase()
                .replace(/[^a-zA-Z\d\s-]/g, '') // Remove invalid characters
                .replace(/\s+/g, '-'); // Replace spaces with dashes
        }
        return '';
    }, []);

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true });
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [watch, slugTransform, setValue]);

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                 <Rte label="Content :" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2 mt-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && post.featuredImage && (
                    <div className="w-full mb-4">
                        <img
                            src={appWriteService.getFilePreview(post.featuredImage)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4 pl-5 ml-3 mt-7"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={post ? "bg-green-500" : undefined} className="w-full mt-12">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm;