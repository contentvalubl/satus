import { notFound } from 'next/navigation'
import { fetchAll, fetchStoryblokStory } from '~/libs/storyblok'
import { StoryblokContextProvider } from '~/libs/storyblok/context'
import { Wrapper } from '../../(components)/wrapper'
import { Article } from './(component)/article'
import s from './article-page.module.css'

// https://nextjs.org/docs/app/api-reference/functions/generate-static-params
const SLUG = 'cdn/stories/blog'

export async function generateStaticParams() {
  const { data } = await fetchAll('cdn/stories', {
    starts_with: 'blog',
  })

  return data.map(({ slug }) => ({ slug }))
}

export default async function StoryblokSubPage({ params }) {
  const { slug } = await params
  const { data } = await fetchStoryblokStory(`${SLUG}/${slug}`)

  if (!data) return notFound()

  return (
    <StoryblokContextProvider {...data}>
      <Wrapper theme="red" className={s.page}>
        <div className={s.inner}>
          <Article />
        </div>
      </Wrapper>
    </StoryblokContextProvider>
  )
}

// https://nextjs.org/docs/app/api-reference/functions/generate-metadata

export async function generateMetadata({ params }) {
  const { slug } = await params
  const { data } = await fetchStoryblokStory(`${SLUG}/${slug}`)
  const metadata = data?.story?.content?.metadata?.[0]

  if (!metadata) return

  return {
    title: metadata?.title,
    description: metadata?.description,
    images: metadata?.image?.filename,
    keywords: metadata?.keywords?.value,
    openGraph: {
      title: metadata?.title,
      description: metadata?.description,
      images: metadata?.image?.filename,
      url: process.env.NEXT_PUBLIC_BASE_URL,
    },
    twitter: {
      title: metadata?.title,
      description: metadata?.description,
      images: metadata?.image?.filename,
    },
  }
}
