import { useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import moment from 'moment'
import YAML from 'yaml'
import styled from 'styled-components'

import { Title } from '@/components/Title'
import { Text } from '@/components/Text'
import { Font } from '@/components/Font'
import { Divider } from '@/components/Divider'
import { List, ListItem } from '@/components/List'
import { Image } from '@/components/Image'
import { Blockquote } from '@/components/Blockquote'

import underlineUrl from '@/assets/underline.svg'

const Header = styled.div`
  height: ${props => props.theme.scale.scale10};
  background: #0a0c28;
`

const MainContainer = styled.main`
  max-width: 892px;
  margin-top: -${props => props.theme.scale.scale09};
  margin-bottom: ${props => props.theme.scale.scale07};
  margin-inline: auto;
  /* padding-inline: ${props => props.theme.scale.scale08}; */
  // - - -
  /* height: 400px; */
`

const BlogTitle = styled.h1`
  margin-bottom: ${props => props.theme.scale.scale03};
  color: ${props => props.theme.color.neutral.gray01};
  font-weight: ${props => props.theme.font.fontWeightBold};
  font-size: ${props => props.theme.font.fontSize8};
  line-height: ${props => props.theme.font.lineHeight9};
  text-transform: capitalize;
  /* word-break: break-all; */
`

const DateAndReadTime = styled.p`
  margin-bottom: ${props => props.theme.scale.scale04};
  color: ${props => props.theme.color.neutral.gray01};
  font-weight: ${props => props.theme.font.fontWeightRegular};
  font-size: ${props => props.theme.font.fontSize5};
  line-height: ${props => props.theme.font.lineHeight5};
`

const AuthorContainer = styled.a`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.scale.scale04};
`

const Avatar = styled.img`
  margin-right: 24px;
  height: ${props => props.theme.scale.scale06};
  width: ${props => props.theme.scale.scale06};
  border: 2px solid ${props => props.theme.color.neutral.gray01};
  border-radius: 50%;
`

const Name = styled(DateAndReadTime)`
  margin-bottom: 0;
`

const Cover = styled.img`
  width: 100%;
  margin-bottom: ${props => props.theme.scale.scale04};
  border-radius: ${props => props.theme.scale.scale02};
  /* height: 336px; */
`
const Article = styled.div`
  margin-bottom: ${props => props.theme.scale.scale08};
`

const RelatedContainer = styled.div``

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: ${props => props.theme.scale.scale06};
`

const TitleText = styled.span`
  padding-inline: ${props => props.theme.scale.scale06};
  padding-bottom: ${props => props.theme.scale.scale01};
  font-weight: ${props => props.theme.font.fontWeightBold};
  font-size: ${props => props.theme.font.fontSize8};
  line-height: ${props => props.theme.font.lineHeight8};
  text-transform: capitalize;
  background-image: url(${underlineUrl});
  background-clip: border-box;
  background-repeat: no-repeat;
  background-position: bottom 0 right 0;
`

const RelatedList = styled.ul`
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  flex: 1;
  margin-bottom: ${props => props.theme.scale.scale04};
`

const RelatedListItem = styled.li`
  width: 48%;
  margin-bottom: ${props => props.theme.scale.scale04};
  border: 1px solid #dfdfdf;
  border-radius: ${props => props.theme.scale.scale03};
  box-shadow: 5px 5px 15px -5px ${props => props.theme.color.neutral.gray06};
  overflow: hidden;
`

const RelatedListItemCover = styled.img`
  width: 100%;
  height: ${props => props.theme.scale.scale08};
`

const RelatedListItemContentContainer = styled.div`
  padding: ${props => props.theme.scale.scale03};
  // - - -
  /* height: 100px; */
`

const RelatedListItemTitle = styled.h1`
  margin-bottom: ${props => props.theme.scale.scale03};
  font-weight: ${props => props.theme.font.fontWeightBold};
  font-size: ${props => props.theme.font.fontSize4};
  line-height: ${props => props.theme.font.lineHeight4};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-transform: capitalize;
`

const RelatedListItemDescription = styled.p`
  display: -webkit-box;
  margin-bottom: ${props => props.theme.scale.scale03};
  font-weight: ${props => props.theme.font.fontWeightRegular};
  font-size: ${props => props.theme.font.fontSize3};
  line-height: ${props => props.theme.font.lineHeight3};
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
`

const RelatedListItemButton = styled(Link)`
  display: inline-block;
  margin-bottom: ${props => props.theme.scale.scale01};
  padding-block: ${props => props.theme.scale.scale01};
  padding-inline: ${props => props.theme.scale.scale04};
  color: ${props => props.theme.color.neutral.gray01};
  font-weight: ${props => props.theme.font.fontWeightRegular};
  font-size: ${props => props.theme.font.fontSize2};
  line-height: ${props => props.theme.font.lineHeight2};
  background: linear-gradient(90deg, #767ee5, #9966cc);
  border-radius: 20px;
`

const RelatedButton = styled(Link)`
  display: block;
  text-align: right;
  color: #7680dd;
  font-weight: ${props => props.theme.font.fontWeightRegular};
  font-size: ${props => props.theme.font.fontSize4};
  line-height: ${props => props.theme.font.lineHeight4};
`

const blogMap = import.meta.glob('@/blog/*.md', { as: 'raw', eager: true })
// console.log(blogMap)

const BlogDetailPage: React.FC = () => {
  const { msg } = useParams()
  // console.log(`/src/blog/${msg}.md`)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  const [year, month, day, ...name] = (msg || '').split('-')
  const blogName = name.join(' ')

  const blogContent = blogMap[`/src/blog/${msg}.md`]
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [space, _metadata, description, article] = blogContent.split('---\n')
  const metadata = YAML.parse(_metadata)
  // console.log(metadata)

  return (
    <>
      <Header />
      <MainContainer>
        <BlogTitle>{blogName}</BlogTitle>
        <DateAndReadTime>
          {moment(`${year}-${month}-${day}`).format('MMM Do')} ·{' '}
          {metadata.read_time} min read
        </DateAndReadTime>
        <AuthorContainer href={metadata.author.url}>
          <Avatar src={metadata.author.img_url} />
          <Name>{metadata.author.name}</Name>
        </AuthorContainer>
        <Cover src={metadata.cover} />
        <Article>
          <ReactMarkdown
            children={article}
            rehypePlugins={[rehypeHighlight]}
            remarkPlugins={[remarkGfm]}
            components={{
              h1: ({ level, children }) => (
                <Title level={level} children={children} />
              ),
              h2: ({ level, children }) => (
                <Title level={level} children={children} />
              ),
              h3: ({ level, children }) => (
                <Title level={level} children={children} />
              ),
              h4: ({ level, children }) => (
                <Title level={level} children={children} />
              ),
              h5: ({ level, children }) => (
                <Title level={level} children={children} />
              ),
              h6: ({ level, children }) => (
                <Title level={level} children={children} />
              ),
              p: ({ children }) => <Text children={children} />,
              em: ({ children }) => <Font children={children} />,
              strong: ({ children }) => (
                <Font type={'bold'} children={children} />
              ),
              hr: () => <Divider />,
              ul: ({ depth, ordered, className, children }) => (
                <List
                  depth={depth}
                  ordered={ordered}
                  className={className}
                  children={children}
                />
              ),
              ol: ({ depth, ordered, className, children }) => (
                <List
                  depth={depth}
                  ordered={ordered}
                  className={className}
                  children={children}
                />
              ),
              li: ({ children }) => <ListItem children={children} />,
              img: ({ src, alt }) => <Image src={src} alt={alt} />,
              blockquote: ({ children }) => <Blockquote>{children}</Blockquote>,
            }}
          />
        </Article>
        <RelatedContainer>
          <TitleContainer>
            <TitleText>related resources</TitleText>
          </TitleContainer>
          <RelatedList>
            {Object.keys(blogMap).map((blogFileName, index) => {
              const _blogFileName = blogFileName.split(/[/,.]/)
              const routerName = _blogFileName[3]
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const [year, month, day, ...name] = _blogFileName[3].split('-')
              const blogName = name.join(' ')
              // console.log(blogMap[blogFileName])
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const [space, _metadata, description, article] =
                blogMap[blogFileName].split('---\n')
              const metadata = YAML.parse(_metadata)
              // console.log(metadata)
              // console.log(blogFileName)
              // console.log(`/src/blog/${msg}.md`)
              const currentBlog = `/src/blog/${msg}.md`

              if (blogFileName === currentBlog) {
                return null
              }
              return (
                <RelatedListItem key={index}>
                  <RelatedListItemCover src={metadata.cover} alt="cover" />
                  <RelatedListItemContentContainer>
                    <RelatedListItemTitle>{blogName}</RelatedListItemTitle>
                    <RelatedListItemDescription>
                      {description}
                    </RelatedListItemDescription>
                    <RelatedListItemButton
                      onClick={() => window.scrollTo(0, 0)}
                      to={`/blog/${routerName}`}
                    >
                      Read more
                    </RelatedListItemButton>
                  </RelatedListItemContentContainer>
                </RelatedListItem>
              )
            })}
          </RelatedList>
          <RelatedButton to="/blog">View All →</RelatedButton>
        </RelatedContainer>
      </MainContainer>
    </>
  )
}

export default BlogDetailPage
