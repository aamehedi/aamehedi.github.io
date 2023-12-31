import Image from 'next/image'
import {getSortedPostsData} from "@/lib/util";
import Link from "next/link";


const Home = async () => {
    const allPostsData = await Promise.all(await getSortedPostsData());
    return (
        <>
            <section>
                <h2>Blog</h2>
                <ul>
                    {allPostsData.map(({id, date, title}) => (
                        <li key={id}>
                            {<Link href={`/admin/posts/${id}`}>{title}</Link>}
                            <br/>
                            {id}
                            <br/>
                            {date}
                            <hr/>
                        </li>
                    ))}
                </ul>
            </section>
        </>
    )
}

export default Home;
