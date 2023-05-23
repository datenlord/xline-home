import { useParams } from 'react-router-dom'
import styled from 'styled-components'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { deepDiveConfig } from '@/doc.config'
import underlineUrl from '@/assets/underline.svg'
import { Title } from '@/components/Title'
import { Text } from '@/components/Text'
import { Font } from '@/components/Font'
import { Divider } from '@/components/Divider'
import { List, ListItem } from '@/components/List'
import { Menu } from '@/components/Menu'
import { Image } from '@/components/Image'
import { Blockquote } from '@/components/Blockquote'

const modules = import.meta.glob('@/deep-dive/*.md', { as: 'raw', eager: true })

const CoverWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(86px + 416px);
  padding-top: 86px;
  background: #0a0c28;
  @media screen and (max-width: 1024px) {
    height: calc(63px + 312px);
    padding-top: 64.5px;
  }
  @media screen and (max-width: 768px) {
    height: calc(53px + 208px);
    padding-top: 43px;
  }
`

const CoverTitle = styled.h1`
  position: relative;
  display: inline-block;
  padding-inline: 32px;
  color: white;
  font-weight: 700;
  font-size: 72px;
  /* line-height: 80.64px; */
  line-height: 1.1;
  text-transform: capitalize;
  transform: translateY(-10%);
  @media screen and (max-width: 1024px) {
    padding-inline: 24px;
    font-size: 54px;
  }
  @media screen and (max-width: 768px) {
    padding-inline: 16px;
    font-size: 36px;
  }
`

const Underline = styled.img`
  z-index: -1;
  position: absolute;
  left: 50%;
  bottom: -17px;
  transform: translateX(-45%);
  width: 295.01px;
  height: 35.35px;
  @media screen and (max-width: 1024px) {
    bottom: -12px;
    width: 222px;
    height: 27px;
  }
  @media screen and (max-width: 768px) {
    bottom: -8px;
    width: 148px;
    height: 18px;
  }
`

const MainContainer = styled.main`
  display: flex;
  margin-inline: auto;
  padding-block: ${props => props.theme.scale.scale05};
  padding-inline: ${props => props.theme.scale.scale07};
  max-width: ${props => props.theme.scale.scale12};
  // - - -
  /* height: 200px;
  background-color: lightcoral; */
  @media screen and (max-width: 1024px) {
    padding-block: 36px;
    padding-inline: 96px;
  }
  @media screen and (max-width: 768px) {
    padding-block: 24px;
    padding-inline: 64px;
  }
`

const ArticleContainer = styled.div`
  width: 75%;
  /* flex: 1; */

  // - - -
  /* min-height: 100px;
  background-color: lightcyan; */
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`

const SideBarContainer = styled.div`
  flex-shrink: 0;
  width: 25%;
  margin-right: ${props => props.theme.scale.scale05};
  // - - -
  /* height: 100px;
  background-color: lightblue; */
  @media screen and (max-width: 1024px) {
    display: none;
  }
`

const SideBarTitle = styled.p`
  margin-bottom: ${props => props.theme.scale.scale06};
  color: ${props => props.theme.color.neutral.gray07};
  font-weight: ${props => props.theme.font.fontWeightBold};
  font-size: ${props => props.theme.font.fontSize5};
  line-height: ${props => props.theme.font.lineHeight5};
`

const DeepDivePage = () => {
  const { params } = useParams()

  return (
    <>
      <CoverWrapper>
        <CoverTitle>
          {params?.split('-').join(' ')}
          <Underline src={underlineUrl} alt="underline" />
        </CoverTitle>
      </CoverWrapper>
      <MainContainer>
        <SideBarContainer>
          <SideBarTitle>Deep Dive</SideBarTitle>
          <Menu item={deepDiveConfig} />
        </SideBarContainer>
        <ArticleContainer>
          <ReactMarkdown
            children={modules[`/src/deep-dive/${params}.md`]}
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeHighlight]}
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
        </ArticleContainer>
      </MainContainer>
    </>
  )
}

export default DeepDivePage
