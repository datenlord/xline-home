import styled from 'styled-components'
import { Link } from 'react-router-dom'
import YAML from 'yaml'
import moment from 'moment'

import underlineUrl from '@/assets/underline.svg'
import Image1Url from '@/assets/video/image1.png'
import Image2Url from '@/assets/video/image2.png'
import DotUrl from '@/assets/video/dot.svg'

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
  text-transform: capitalize;
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
  word-break: break-all;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  overflow: hidden;
  text-overflow: ellipsis;
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

const List = styled.ul``
const ListItem = styled.li`
  display: flex;
  align-items: center;
  padding-block: 24px;
  padding-inline: 12px;
  border-bottom: 0.5px solid #9a9a9a;
  cursor: pointer;
  /* :last-child {
    border-bottom: none;
  } */
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    padding-block: 18px;
    padding-inline: 9px;
  }
  @media screen and (max-width: 768px) {
    padding-block: 12px;
    padding-inline: 6px;
  }
`
const ContentContainer = styled.div`
  flex-grow: 1;
  margin-right: 48px;
  @media screen and (max-width: 1024px) {
    margin-right: 0;
  }
`
const Image = styled.img`
  width: 40%;
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
`
const Date = styled.div`
  margin-bottom: 6px;
  font-size: 15px;
  line-height: 2;
  font-weight: 600px;
  color: #7680dd;
  @media screen and (max-width: 1024px) {
    margin-bottom: 4.5px;
    font-size: 12px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 3px;
  }
`
const Title = styled.div`
  margin-bottom: 27px;
  font-size: 27px;
  line-height: 1.22;
  font-weight: 600;
  color: #1e1e1e;
  @media screen and (max-width: 1024px) {
    margin-bottom: 20.25px;
    font-size: 20.25;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 13.5px;
    font-size: 16px;
  }
`
const Description = styled.div`
  margin-bottom: 6px;
  font-size: 13.5px;
  line-height: 1.77;
  font-weight: 400;
  color: #7d7d7d;
  @media screen and (max-width: 1024px) {
    margin-bottom: 4.5px;
    font-size: 12px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 3px;
  }
`
const MetaDataContainer = styled.div`
  display: flex;
  align-items: center;
  font-size: 12px;
  line-height: 1%.5;
  font-weight: 600;
  @media screen and (max-width: 1024px) {
    font-size: 9px;
  }
  @media screen and (max-width: 768px) {
    font-size: 6px;
  }
`
const Dot = styled.img`
  width: 22px;
  height: 22px;
  padding-inline: 8px;
  @media screen and (max-width: 1024px) {
    width: 16.5px;
    height: 16.5px;
    padding-inline: 6px;
  }
  @media screen and (max-width: 768px) {
    width: 11px;
    height: 11px;
    padding-inline: 4px;
  }
`
const Author = styled.div`
  color: #797979;
`
const ReadTime = styled.div`
  color: #7680dd;
`

const data = [
  {
    date: '2023-01-19',
    title: 'Geo-distributed Metadata Management System',
    description:
      'The webinar aims to briefly introduce DatenLord’s open source project Xline, a distributed metadata management system for multi-clusters. It reveals the motivation of Xline, the architecture of it and the important consensus protocol, CURP. The performance comparison shows the advantage of Xline over the current solution.',
    author: 'By DatenLord',
    read: '19min',
    img: Image1Url,
    url: 'https://www.cncf.io/online-programs/cncf-on-demand-webinar-geo-distributed-metadata-management-system/',
  },
  {
    date: '2023-05-04',
    title: 'Proofing the Correctness of the CURP Consensus Protocol Using TLA+',
    description:
      'The CURP Replication Protocol (NSDI ’19) aims to eliminate the additional round trips between servers in replicated state machines. We extended CURP into a consensus protocol and used it in our open source project Xline. This webinar is about how we modeled the CURP consensus protocol in TLA+ and verified the correctness of it.',
    author: 'By DatenLord',
    read: '20min',
    img: Image2Url,
    url: 'https://www.cncf.io/online-programs/cncf-on-demand-webinar-proofing-the-correctness-of-the-curp-consensus-protocol-using-tla/',
  },
]

interface CardProps {
  data: {
    date: string
    title: string
    description: string
    author: string
    read: string
    img: string
    url: string
  }
}

const Card: React.FC<CardProps> = data => {
  const { date, title, description, author, read, img, url } = data.data
  return (
    <ListItem onClick={() => (window.location.href = `${url}`)}>
      <ContentContainer>
        <Date>{moment(date, 'YYYY-MM-DD').format('dddd MMMM D, YYYY')}</Date>
        <Title>{title}</Title>
        <Description>{description}</Description>
        <MetaDataContainer>
          <Author>{author}</Author>
          <Dot src={DotUrl} />
          <ReadTime>{read}</ReadTime>
        </MetaDataContainer>
      </ContentContainer>
      <Image src={img} />
    </ListItem>
  )
}


const VideoListPage = () => {
  return (
    <>
      <CoverWrapper>
        <CoverTitle>
          video
          <Underline src={underlineUrl} alt="underline" />
        </CoverTitle>
      </CoverWrapper>
      <MainContainer>
        <SideBarContainer>
          <SideBarTitle>Video</SideBarTitle>
          {data.map(({ title, url }) => {
            return (
              <SideBarListItem to={url} key={title}>
                {title}
              </SideBarListItem>
            )
          })}
        </SideBarContainer>
        {/* <BlogList> */}
        <List>
          {data.map(item => {
            return <Card key={item.title} data={item} />
          })}
        </List>
        {/* </BlogList> */}
      </MainContainer>
    </>
  )
}

export default VideoListPage
