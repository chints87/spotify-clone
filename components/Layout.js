import Head from 'next/head';

export default function Layout({ title, description,keywords, children }) {
    return (
        <div>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />           
            </Head>
            { children }
        </div>
       
    )
}

Layout.defaultProps = {
    title : 'App Name | App description',
    description : 'What the webapp is about',
    keywords : 'is, a, keyword,',
}