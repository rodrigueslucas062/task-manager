import Head from 'next/head';
import { useRouter } from 'next/router';

const SEO = ({ title, description, keywords }) => {
    const router = useRouter();

    const pageTitle = title || 'Synapse';
    const pageDescription = description || 'ToDo list';
    const defaultKeywords = [ 'To-do list' ];
    const pageKeywords = keywords || defaultKeywords.join(', ');

    const canonicalUrl = `https://${router.pathname}`;

    return (
        <Head>
            <title>{pageTitle}</title>
            <meta name="description" content={pageDescription} />
            <meta name="keywords" content={pageKeywords} />
            <meta property="og:title" content={pageTitle} />
            <meta property="og:description" content={pageDescription} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:type" content="website" />
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={pageTitle} />
            <meta name="twitter:description" content={pageDescription} />
            <link rel="canonical" href={canonicalUrl} />
        </Head>
    );
};

export default SEO;
