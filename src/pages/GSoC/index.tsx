import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import moment from 'moment'
import YAML from 'yaml'
import styled from 'styled-components'
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

import { Title } from '@/components/Title'
import { Text } from '@/components/Text'
import { Font } from '@/components/Font'
import { Divider } from '@/components/Divider'
import { List, ListItem } from '@/components/List'
import { Image } from '@/components/Image'
import { Blockquote } from '@/components/Blockquote'

const Header = styled.div`
  height: 600px;
  background: #0a0c28;
  @media screen and (max-width: 1024px) {
    height: 414px;
  }
  @media screen and (max-width: 768px) {
    height: 276px;
  }
`

const MainContainer = styled.main`
  max-width: 1024px;
  margin-left: 30vw;
  padding-inline: 5vw;
  margin-top: -${props => props.theme.scale.scale09};
  margin-bottom: ${props => props.theme.scale.scale07};
  /* margin-left: auto; */
  /* padding-inline: 64px; */
  // - - -
  /* height: 400px; */
  @media screen and (max-width: 1024px) {
    margin-bottom: 15px;
    font-size: 15px;
  }
  @media screen and (max-width: 1024px) {
    margin-top: -252px;
  }
  @media screen and (max-width: 768px) {
    margin-top: -168px;
    /* padding-inline: 32px; */
  }
`

const Article = styled.div`
  margin-bottom: ${props => props.theme.scale.scale08};
  @media screen and (max-width: 1024px) {
    margin-bottom: 156px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 104px;
  }
`

const Title_ = styled.div`
  margin-bottom: ${props => props.theme.scale.scale07};
  color: ${props => props.theme.color.neutral.gray01};
  font-weight: ${props => props.theme.font.fontWeightBold};
  font-size: ${props => props.theme.font.fontSize10};
  /* line-height: ${props => props.theme.font.lineHeight9}; */
  line-height: 1.4;
  text-transform: capitalize;
  /* word-break: break-all; */
  @media screen and (max-width: 1024px) {
    margin-bottom: 15px;
    font-size: 34.5px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 10px;
    font-size: 23px;
  }
`

const BlogTitle = styled.h1`
  margin-bottom: ${props => props.theme.scale.scale03};
  color: ${props => props.theme.color.neutral.gray01};
  font-weight: ${props => props.theme.font.fontWeightBold};
  font-size: ${props => props.theme.font.fontSize8};
  /* line-height: ${props => props.theme.font.lineHeight9}; */
  line-height: 1.4;
  text-transform: capitalize;
  /* word-break: break-all; */
  @media screen and (max-width: 1024px) {
    margin-bottom: 15px;
    font-size: 34.5px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 10px;
    font-size: 23px;
  }
`

const DateAndReadTime = styled.p`
  margin-bottom: ${props => props.theme.scale.scale04};
  color: ${props => props.theme.color.neutral.gray01};
  font-weight: ${props => props.theme.font.fontWeightRegular};
  font-size: ${props => props.theme.font.fontSize5};
  /* line-height: ${props => props.theme.font.lineHeight5}; */
  line-height: 1.3;
  @media screen and (max-width: 1024px) {
    margin-bottom: 24px;
    font-size: 18px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 16px;
    font-size: 12px;
  }
`

const AuthorContainer = styled.a`
  display: flex;
  align-items: center;
  margin-bottom: ${props => props.theme.scale.scale08};
  @media screen and (max-width: 1024px) {
    margin-bottom: 24px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 16px;
  }
`

const Avatar = styled.img`
  margin-right: 24px;
  height: ${props => props.theme.scale.scale06};
  width: ${props => props.theme.scale.scale06};
  border: 2px solid ${props => props.theme.color.neutral.gray01};
  border-radius: 50%;
  @media screen and (max-width: 1024px) {
    margin-right: 18px;
    height: 60px;
    width: 60px;
  }
  @media screen and (max-width: 768px) {
    margin-right: 12px;
    height: 60px;
    width: 60px;
  }
`
const Cover = styled.img`
  width: 100%;
  margin-bottom: ${props => props.theme.scale.scale04};
  border-radius: ${props => props.theme.scale.scale02};
  /* height: 336px; */
  @media screen and (max-width: 1024px) {
    margin-bottom: 24px;
    border-radius: 9px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 16px;
    border-radius: 6px;
  }
`
const Name = styled(DateAndReadTime)`
  margin-bottom: 0;
`
const PageCtr = styled.div`
  display: flex;
  padding-inline: 4vw;
`
const SideBar = styled.div`
  position: sticky;
  top: 0;
  float: left;
  width: 30vw;
  padding-block: 5vh;
  padding-inline: 5vw;
  height: 100vh;
  overflow-y: scroll;
`

const mds = import.meta.glob('@/pages/GSoC/index.md', {
  as: 'raw',
  eager: true,
})
// console.log(blogMap)
const md = mds[`/src/pages/GSoC/index.md`]
// console.log(md)

const BlogDetailPage: React.FC = () => {
  const [headings, setHeadings] = useState<Element[]>()

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    const container = document.getElementById('article')
    const _headings = container?.querySelectorAll('h2, h3')
    if (_headings != undefined) {
      setHeadings(Array.from(_headings))
    }
  }, [])

  const handleClick = (id: string) => {
    console.log(document.querySelector(`#${id}`))
    document.querySelector(`#${id}`)?.scrollIntoView({
      // behavior: 'smooth',
    })
  }

  return (
    <>
      <Header />
      <SideBar>
        {headings && headings.map(heading => {
          if (heading.tagName == 'H2') {
            return <div style={{ fontSize: '18px', fontWeight: '600', paddingBlock: '4px', cursor: 'pointer' }} onClick={() => handleClick(heading.id)}>{heading.textContent}</div>
          } else {
            return <div style={{ paddingLeft: '16px', fontSize: '16px', paddingBlock: '4px', cursor: 'pointer'}} onClick={() => handleClick(heading.id)}>{heading.textContent}</div>
          }
        })}
      </SideBar>
      <MainContainer>
        <BlogTitle>GSoC 2024 Ideas Page</BlogTitle>
        <DateAndReadTime>
          {moment(`2024-02-04`).format('MMM Do')} · 10 min read
        </DateAndReadTime>
        <AuthorContainer href={'https://github.com/bsbds'}>
          <Avatar
            src={'https://avatars.githubusercontent.com/u/69835502?v=4'}
          />
          <Name>bsbdf</Name>
        </AuthorContainer>
        <Article id="article">
          <ReactMarkdown
            children={md}
            rehypePlugins={[rehypeHighlight, rehypeKatex]}
            remarkPlugins={[remarkGfm, remarkMath]}
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
      </MainContainer>
    </>
  )
}

export default BlogDetailPage
