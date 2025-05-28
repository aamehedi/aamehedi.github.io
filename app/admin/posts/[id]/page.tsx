"use client"

import Image from 'next/image';
import dynamic from 'next/dynamic';
import {Suspense, useEffect, useState} from 'react';
import '@mdxeditor/editor/style.css';


const ForwardRefEditor = dynamic(() => import("@/components/ForwardRefEditor"), { ssr: false })


 const Post = ({ params } : { params: any}) => {
    const [post, setPost] = useState("");

    const fetchPost = async (id: string) => {
        const response = await fetch(`/api/posts/${id}`);
        const data = await response.json();
        setPost(data);
    }

    useEffect(() => {
        fetchPost(params.id);
    }, [params.id]);

    return (
        <>
                <ForwardRefEditor markdown={post} />
        </>
    );
}

export default Post;
