import { useEffect } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import YAML from 'yaml'

import underlineUrl from '@/assets/underline.svg'

const CoverWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: calc(86px + 416px);
  padding-top: 86px;
  background: #0a0c28;
  @media screen and (max-width: 1024px) {
    padding-top: 69px;
    height: calc(312px + 69px);
  }
  @media screen and (max-width: 1024px) {
    padding-top: 53px;
    height: calc(208px + 53px);
  }
`
const CoverTitle = styled.h1`
  position: relative;
  display: inline-block;
  padding-inline: 32px;
  color: white;
  font-weight: 700;
  font-size: 72px;
  line-height: 1.5;
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
    bottom: -12%;
    width: 221px;
    height: 27px;
  }
  @media screen and (max-width: 768px) {
    bottom: -8%;
    width: 148px;
    height: 18px;
  }
`
const MainContainer = styled.main`
  display: flex;
  margin-inline: auto;
  padding-block: ${props => props.theme.scale.scale06};
  padding-inline: ${props => props.theme.scale.scale07};
  max-width: ${props => props.theme.scale.scale12};
  // - - -
  /* height: 200px;
  background-color: lightcoral; */
  @media screen and (max-width: 1024px) {
    padding-block: 60px;
    padding-inline: 96px;
  }
  @media screen and (max-width: 768px) {
    padding-block: 40px;
    padding-inline: 64px;
  }
`
const SideBarContainer = styled.div`
  flex-shrink: 0;
  width: ${props => props.theme.scale.scale08};
  margin-right: ${props => props.theme.scale.scale06};
  padding-block: ${props => props.theme.scale.scale07};
  // - - -
  /* height: 100px;
  background-color: lightblue; */
  @media screen and (max-width: 1440px) {
    display: none;
  }
`
const SideBarTitle = styled.p`
  margin-bottom: ${props => props.theme.scale.scale04};
  color: #a6a6a6;
  font-weight: ${props => props.theme.font.fontWeightBold};
  font-size: ${props => props.theme.font.fontSize4};
  line-height: ${props => props.theme.font.lineHeight4};
`
const SideBarListItem = styled(Link)`
  display: block;
  margin-bottom: ${props => props.theme.scale.scale03};
  padding: ${props => props.theme.scale.scale03};
  color: #454545;
  font-weight: ${props => props.theme.font.fontWeightRegular};
  font-size: ${props => props.theme.font.fontSize3};
  line-height: ${props => props.theme.font.lineHeight3};
  border: 1px solid #dfdfdf;
  border-radius: ${props => props.theme.scale.scale01};
  box-shadow: 5px 5px 15px -5px ${props => props.theme.color.neutral.gray06};
`
const BlogList = styled.div`
  display: flex;
  flex-flow: wrap;
  justify-content: space-between;
  /* flex: 1; */
  /* padding-inline: ${props => props.theme.scale.scale05}; */
  // - - -
  /* min-height: 100px;
  background-color: lightcyan; */
  @media screen and (max-width: 1024px) {
    flex-direction: column;
  }
`
const BlogListItem = styled.div`
  width: 48%;
  margin-bottom: ${props => props.theme.scale.scale04};
  border: 1px solid #dfdfdf;
  border-radius: ${props => props.theme.scale.scale03};
  box-shadow: 5px 5px 15px -5px ${props => props.theme.color.neutral.gray06};
  overflow: hidden;
  // - - -
  /* height: 400px; */
  /* background: lightpink; */
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`
const BlogListItemCover = styled.img`
  width: 100%;
  /* height: ${props => props.theme.scale.scale08}; */
`

const BlogListItemContentContainer = styled.div`
  padding: ${props => props.theme.scale.scale03};
  // - - -
  /* height: 100px; */
  @media screen and (max-width: 1024px) {
    padding: 15px;
  }
  @media screen and (max-width: 768px) {
    padding: 10px;
  }
`
const BlogListItemTitle = styled.h1`
  margin-bottom: ${props => props.theme.scale.scale03};
  font-weight: ${props => props.theme.font.fontWeightBold};
  font-size: ${props => props.theme.font.fontSize4};
  /* line-height: ${props => props.theme.font.lineHeight4}; */
  line-height: 1.5;
  /* white-space: nowrap; */
  overflow: hidden;
  text-overflow: ellipsis;
  /* text-transform: capitalize; */
  @media screen and (max-width: 1024px) {
    margin-bottom: 15px;
    font-size: 15px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 10px;
    font-size: 10px;
  }
`
const BlogListItemDescription = styled.p`
  display: -webkit-box;
  margin-bottom: ${props => props.theme.scale.scale03};
  font-weight: ${props => props.theme.font.fontWeightRegular};
  font-size: ${props => props.theme.font.fontSize3};
  /* line-height: ${props => props.theme.font.lineHeight3}; */
  line-height: 1.5;
  /* word-break: break-all; */
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
  word-wrap: nowrap;
  @media screen and (max-width: 1024px) {
    margin-bottom: 15px;
    font-size: 12px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 10px;
    font-size: 8px;
  }
`

const BlogListItemButton = styled(Link)`
  display: inline-block;
  margin-bottom: ${props => props.theme.scale.scale01};
  padding-block: ${props => props.theme.scale.scale01};
  padding-inline: ${props => props.theme.scale.scale04};
  color: ${props => props.theme.color.neutral.gray01};
  font-weight: ${props => props.theme.font.fontWeightRegular};
  font-size: ${props => props.theme.font.fontSize2};
  /* line-height: ${props => props.theme.font.lineHeight2}; */
  line-height: 1.5;
  background: linear-gradient(90deg, #767ee5, #9966cc);
  border-radius: 20px;
  @media screen and (max-width: 1024px) {
    margin-bottom: 6px;
    padding-block: 6px;
    padding-inline: 24px;
    font-size: 10.5px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 4px;
    padding-block: 4px;
    padding-inline: 16px;
    font-size: 7px;
  }
`

const blogMap = import.meta.glob('@/blog/*.md', { as: 'raw', eager: true })
// console.log(blogMap)

const BlogListPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <CoverWrapper>
        <CoverTitle>
          blog
          <Underline src={underlineUrl} alt="underline" />
        </CoverTitle>
      </CoverWrapper>
      <MainContainer>
        <SideBarContainer>
          <SideBarTitle>Blog</SideBarTitle>
          {Object.keys(blogMap).map(blogFileName => {
            const _blogFileName = blogFileName.split(/[/,.]/)
            // console.log(_blogFileName[3])
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const [year, month, day, ...name] = _blogFileName[3].split('-')
            const blogName = name.join(' ')
            const routerName = _blogFileName[3]
            // console.log(year, month, day)
            // console.log(blogName)
            // console.log(routerName)
            return (
              <SideBarListItem to={routerName} key={blogName}>
                {blogName}
              </SideBarListItem>
            )
          })}
        </SideBarContainer>
        <BlogList>
          {Object.keys(blogMap)
            .reverse()
            .map((blogFileName, index) => {
              const _blogFileName = blogFileName.split(/[/,.]/)
              const routerName = _blogFileName[3]
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const [year, month, day, ...name] = _blogFileName[3].split('-')
              const blogName = name.join(' ')
              console.log(blogName)
              // console.log(blogMap[blogFileName])
              // eslint-disable-next-line @typescript-eslint/no-unused-vars
              const [space, _metadata, description, article] =
                blogMap[blogFileName].split('---\n')
              const metadata = YAML.parse(_metadata)
              // console.log(metadata)
              return (
                <BlogListItem key={index}>
                  <BlogListItemCover src={metadata.cover} alt="cover" />
                  <BlogListItemContentContainer>
                    <BlogListItemTitle>{blogName}</BlogListItemTitle>
                    <BlogListItemDescription>
                      {description}
                    </BlogListItemDescription>
                    <BlogListItemButton to={routerName}>
                      Read more
                    </BlogListItemButton>
                  </BlogListItemContentContainer>
                </BlogListItem>
              )
            })}
        </BlogList>
      </MainContainer>
    </>
  )
}

export default BlogListPage
