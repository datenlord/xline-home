import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'

import logoUrl from '@/assets/logo.svg'
import homeCoverUrl from '@/assets/home-cover.png'
import underlineUrl from '@/assets/underline.svg'
import introductionUrl from '@/assets/home-introduction.png'
import featureUrl from '@/assets/home-feature.png'
import featureIcon1 from '@/assets/home-feature-icon-1.svg'
import featureIcon2 from '@/assets/home-feature-icon-2.svg'
import featureIcon3 from '@/assets/home-feature-icon-3.svg'
import featureIcon4 from '@/assets/home-feature-icon-4.svg'
import innovationUrl from '@/assets/home-innovation.svg'

const CoverWrapper = styled.div`
  background-image: url(${homeCoverUrl});
  background-size: cover;
`
const Cover = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-top: calc(86px + 134px);
  padding-bottom: 96px;
  padding-inline: 156px;
  color: white;
  @media screen and (max-width: 1024px) {
    padding-top: calc(69px + 100px);
    padding-bottom: 72px;
    padding-inline: 117px;
  }
  @media screen and (max-width: 768px) {
    padding-top: calc(53px + 67px);
    padding-bottom: 48px;
    padding-inline: 78px;
  }
`
const CoverTitle = styled.img`
  width: 346px;
  height: 100px;
  margin-bottom: 36px;
  @media screen and (max-width: 1024px) {
    width: 225px;
    height: 65px;
    margin-bottom: 28px;
  }
  @media screen and (max-width: 786px) {
    width: 104px;
    height: 30px;
    margin-bottom: 24px;
  }
`
const CoverDescription = styled.h1`
  max-width: 90%;
  margin-bottom: 32px;
  font-weight: 500;
  font-size: 39px;
  @media screen and (max-width: 1024px) {
    margin-bottom: 24px;
    font-size: 28.5px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 16px;
    font-size: 19px;
  }
`
const CoverButton = styled.button`
  display: flex;
  align-items: center;
  height: 56px;
  padding-inline: 48px;
  color: ${props => props.theme.color.white};
  font-size: 26px;
  text-transform: capitalize;
  background: linear-gradient(
    90deg,
    hsla(270, 50%, 60%, 1),
    hsla(257, 97%, 73%, 1) 50%,
    hsla(266, 87%, 75%, 1)
  );
  border: none;
  border-radius: 50vh;
  cursor: pointer;
  @media screen and (max-width: 1024px) {
    height: 42px;
    padding-inline: 36px;
    font-size: 19.5px;
  }
  @media screen and (max-width: 768px) {
    height: 28px;
    padding-inline: 24px;
    font-size: 13px;
  }
`
// - - -
const IntroductionWrapper = styled.div`
  background: hsl(210, 20%, 98%);
`
const Introduction = styled.div`
  /* display: flex; */
  max-width: 1440px;
  margin-inline: auto;
  padding-block: ${({ theme }) => theme.scale.xxl};
  padding-inline: 96px;
  @media screen and (max-width: 1024px) {
    padding-block: 96px;
    padding-inline: 72px;
  }
  @media screen and (max-width: 768px) {
    padding-block: 64px;
    padding-inline: 48px;
  }
`
const IntroductionImage = styled.img`
  float: right;
  width: 40%;
  margin-left: 40px;
  margin-bottom: 40px;
  object-fit: contain;
  @media screen and (max-width: 1024px) {
    margin-left: 30px;
    margin-bottom: 30px;
  }
  @media screen and (max-width: 768px) {
    margin-left: 20px;
    margin-bottom: 20px;
  }
  @media screen and (max-width: 425px) {
    width: 100%;
    margin-left: 0px;
  }
`
const IntroductionContent = styled.div``
const IntroductionText = styled.p`
  margin-bottom: ${({ theme }) => theme.scale.md};
  font-weight: 400;
  font-size: 20px;
  line-height: 1.6;
  @media screen and (max-width: 1024px) {
    font-size: 15px;
  }
  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
`
const IntroductionList = styled.ul`
  padding-left: ${({ theme }) => theme.scale.lg};
  @media screen and (max-width: 1024px) {
    padding-left: 48px;
  }
  @media screen and (max-width: 768px) {
    padding-left: 32px;
  }
`
const IntroductionListItem = styled.li`
  position: relative;
  margin-bottom: ${({ theme }) => theme.scale.sm};
  font-weight: 400;
  font-size: 20px;
  line-height: 1.7;
  @media screen and (max-width: 1024px) {
    font-size: 15px;
  }
  @media screen and (max-width: 768px) {
    font-size: 10px;
  }
  ::before {
    content: '';
    position: absolute;
    left: -48px;
    top: 4px;
    height: 32px;
    width: 32px;
    background: linear-gradient(90deg, #767ee5, #9966cc);
    border-radius: 50%;
    @media screen and (max-width: 1024px) {
      left: -36px;
      top: 3px;
      width: 24px;
      height: 24px;
    }
    @media screen and (max-width: 768px) {
      left: -24px;
      top: 2px;
      width: 16px;
      height: 16px;
    }
  }
`
// - - -
const FeaturesWrapper = styled.div``
const Features = styled.div`
  display: flex;
  /* align-items: center; */
  max-width: 1440px;
  margin-inline: auto;
  padding-block: ${({ theme }) => theme.scale.xxl};
  padding-inline: 96px;
  @media screen and (max-width: 1440px) {
    flex-direction: column;
  }
  @media screen and (max-width: 1024px) {
    padding-block: 96px;
    padding-inline: 72px;
  }
  @media screen and (max-width: 768px) {
    padding-block: 64px;
    padding-inline: 48px;
  }
`
const FeaturesLeft = styled.div`
  flex-shrink: 0;
  width: 25%;
  margin-right: 48px;
  @media screen and (max-width: 1440px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 16px;
  }
`
const FeaturesTitleText = styled.h2`
  position: relative;
  margin-top: 104px;
  margin-bottom: 96px;
  font-weight: 700;
  font-size: 44px;
  line-height: 1.4;
  @media screen and (max-width: 1440px) {
    margin-top: 0;
    margin-bottom: 0px;
    text-align: center;
  }
  @media screen and (max-width: 1024px) {
    font-size: 36px;
  }
  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
  /* ::after {
    content: '';
    z-index: -1;
    position: absolute;
    bottom: 0;
    right: 50px;
    display: inline-block;
    width: 250px;
    height: 30px;
    background-image: url(${underlineUrl});
    background-repeat: no-repeat;
    background-size: contain;
  } */
`
const FeaturesTitleImg = styled.img`
  display: block;
  margin-inline: auto;
  width: 100%;
  @media screen and (max-width: 1440px) {
    width: 30%;
  }
`
const FeaturesItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  flex: 1;
  flex-flow: wrap;
`
const FeaturesItem = styled.div`
  width: 48%;
  padding: 16px;
  @media screen and (max-width: 425px) {
    width: 100%;
  }
`
const FeaturesItemIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 102px;
  height: 102px;
  margin-bottom: 32px;
  background: linear-gradient(90deg, #767ee5, #9966cc);
  border-radius: 24px;
  @media screen and (max-width: 1024px) {
    width: 76.5px;
    height: 76.5px;
    margin-bottom: 24px;
    border-radius: 18px;
  }
  @media screen and (max-width: 768px) {
    width: 51px;
    height: 51px;
    margin-bottom: 16px;
    border-radius: 12px;
  }
`
const FeaturesItemIcon = styled.img`
  width: 50%;
  height: 50%;
`
const FeaturesItemTitle = styled.h3`
  margin-bottom: 16px;
  font-weight: 500;
  font-size: 28px;
  line-height: 1.2;
  @media screen and (max-width: 1024px) {
    font-size: 21px;
    margin-bottom: 12px;
  }
  @media screen and (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 8px;
  }
`
const FeaturesItemDescription = styled.p`
  font-weight: 400;
  font-size: 16px;
  line-height: 1.5;
  color: hsla(0, 0%, 0%, 0.6);
  @media screen and (max-width: 1024px) {
    font-size: 12px;
    line-height: 1.3;
  }
  @media screen and (max-width: 768px) {
    font-size: 8px;
    line-height: 1.1;
  }
`
// - - -
const InnovationWrapper = styled.div`
  background: #f9fafb;
`
const Innovation = styled.div`
  display: flex;
  max-width: 1440px;
  margin-inline: auto;
  padding-block: ${({ theme }) => theme.scale.xxl};
  padding-inline: 96px;
  @media screen and (max-width: 1440px) {
    flex-direction: column;
  }
  @media screen and (max-width: 1024px) {
    padding-block: 96px;
    padding-inline: 72px;
  }
  @media screen and (max-width: 768px) {
    padding-block: 64px;
    padding-inline: 48px;
  }
`
const InnovationTitleContainer = styled.div`
  flex-shrink: 0;
  width: 25%;
  margin-right: 48px;
  @media screen and (max-width: 1440px) {
    width: 100%;
    margin-right: 0;
    margin-bottom: 16px;
  }
`
const TitleContainer = styled.div`
  text-align: center;
`
const Title = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  /* height: 70px; */
  margin-inline: auto;
  margin-top: 72px;
  margin-bottom: 48px;
  font-weight: 700;
  font-size: 44px;
  line-height: 1.4;
  /* background-image: url(${underlineUrl});
  background-repeat: no-repeat;
  background-position: bottom 0 right 0; */
  @media screen and (max-width: 1440px) {
    margin-top: 0;
    margin-bottom: 0;
  }
  @media screen and (max-width: 1024px) {
    font-size: 36px;
  }
  @media screen and (max-width: 768px) {
    font-size: 24px;
  }
`
const InnovationImg = styled.img`
  display: block;
  position: relative;
  left: 16px;
  width: 100%;
  margin-inline: auto;
  object-fit: contain;
  @media screen and (max-width: 1440px) {
    left: 12px;
    width: 30%;
  }
`
const InnovationTextWrapper = styled.div`
  flex: 1;
  padding: 48px;
  height: min-content;
  background: white;
  border-radius: 24px;
  @media screen and (max-width: 1024px) {
    padding: 36px;
    border-radius: 18px;
  }
  @media screen and (max-width: 768px) {
    padding: 24px;
    border-radius: 12px;
  }
`
const InnovationText = styled.p`
  margin-bottom: 32px;
  font-weight: 400;
  font-size: 18px;
  line-height: 1.4;
  @media screen and (max-width: 1024px) {
    margin-bottom: 24px;
    font-size: 13.5px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 16px;
    font-size: 9px;
  }
`

const HomePage = () => {
  const navigate = useNavigate()
  return (
    <>
      <CoverWrapper>
        <Cover>
          <CoverTitle src={logoUrl} alt="Xline" />
          <CoverDescription>
            A High-Performance Geo-distributed Metadata Management System
          </CoverDescription>
          <CoverButton onClick={() => navigate('/docs/Get-Started')}>
            get start
          </CoverButton>
        </Cover>
      </CoverWrapper>
      <IntroductionWrapper>
        <Introduction>
          <IntroductionImage src={introductionUrl} alt="Image" />
          <IntroductionContent>
            <IntroductionText>
              Data isolation and data fragmentation resulting from cloud
              barriers have become impediments to business growth. The biggest
              challenge of multi-data center architecture is how to maintain
              strong data consistency and ensure high performance. Traditional
              single-data center solutions cannot meet the availability,
              performance, and consistency requirements of multi-data center
              scenarios.
            </IntroductionText>
            <IntroductionList>
              <IntroductionListItem>
                Xline is a distributed KV storage for metadata management. Xline
                makes it possible to manage metadata, such as indexes,
                permissions, and configurations across multiple clusters.
              </IntroductionListItem>
              <IntroductionListItem>
                Xline can achieve high-performance data access and strong
                consistency in cross data center scenarios.
              </IntroductionListItem>
              <IntroductionListItem>
                Xline is compatible with the ETCD interface, so that existing
                ETCD users can seamlessly switch to Xline and get
                high-performance metadata management across multiple clusters.
              </IntroductionListItem>
            </IntroductionList>
          </IntroductionContent>
        </Introduction>
      </IntroductionWrapper>
      <FeaturesWrapper>
        <Features>
          <FeaturesLeft>
            <FeaturesTitleText>Key Features of Xline</FeaturesTitleText>
            <FeaturesTitleImg src={featureUrl} alt="Image" />
          </FeaturesLeft>
          <FeaturesItemContainer>
            <FeaturesItem>
              <FeaturesItemIconWrapper>
                <FeaturesItemIcon src={featureIcon1} alt="icon" />
              </FeaturesItemIconWrapper>
              <FeaturesItemTitle>
                A distributed KV storage engine for multi-cluster
              </FeaturesItemTitle>
              <FeaturesItemDescription>
                Unified data management for multi-cluster scenarios, making
                mutual access, discovery, and modification simple and
                convenient.
              </FeaturesItemDescription>
            </FeaturesItem>
            <FeaturesItem>
              <FeaturesItemIconWrapper>
                <FeaturesItemIcon src={featureIcon2} alt="icon" />
              </FeaturesItemIconWrapper>
              <FeaturesItemTitle>
                A unified metadata management system
              </FeaturesItemTitle>
              <FeaturesItemDescription>
                Data access across clouds by caching hot data in memory, and
                provide unified data management to automate data migration and
                backup.
              </FeaturesItemDescription>
            </FeaturesItem>
            <FeaturesItem>
              <FeaturesItemIconWrapper>
                <FeaturesItemIcon src={featureIcon3} alt="icon" />
              </FeaturesItemIconWrapper>
              <FeaturesItemTitle>
                A high-performance multi-datacenter consensus protocol
              </FeaturesItemTitle>
              <FeaturesItemDescription>
                It is the first geo distributed consistency management service
                based on the WAN consensus protocol. It addresses the challenges
                of convergence and consistency across clouds.
              </FeaturesItemDescription>
            </FeaturesItem>
            <FeaturesItem>
              <FeaturesItemIconWrapper>
                <FeaturesItemIcon src={featureIcon4} alt="icon" />
              </FeaturesItemIconWrapper>
              <FeaturesItemTitle>
                Compatible with the ETCD interface
              </FeaturesItemTitle>
              <FeaturesItemDescription>
                Provide KV interface, Multi-Version Concurrency Control and is
                compatible with K8S.
              </FeaturesItemDescription>
            </FeaturesItem>
          </FeaturesItemContainer>
        </Features>
      </FeaturesWrapper>
      <InnovationWrapper>
        <Innovation>
          <InnovationTitleContainer>
            <TitleContainer>
              <Title>Innovation</Title>
            </TitleContainer>
            <InnovationImg src={innovationUrl} alt="image" />
          </InnovationTitleContainer>
          <InnovationTextWrapper>
            <InnovationText>
              Cross-datacenter network latency is the most important factor that
              impacts the performance of geo-distributed systems, especially
              when a consensus protocol is used. As is well known, consensus
              protocols are frequently used to achieve high availability. For
              instance, Etcd uses the Raft protocol, which is quite popular in
              recently developed systems.
            </InnovationText>
            <InnovationText>
              Although Raft is stable and easy to implement, it takes 2 RTTs to
              complete a consensus request from the view of a client. One RTT
              takes place between the client and the leader server, and the
              leader server takes another RTT to broadcast the message to the
              follower servers. In a geo-distributed environment where an RTT
              can run from tens to hundreds of milliseconds, two RTTs would be
              two expensive
            </InnovationText>
            <InnovationText>
              We adopt a new consensus protocol named CURP to resolve the above
              issue. Please refer to the paper for a detailed description. The
              main benefit of the protocol is reducing 1 RTT when contention is
              not too high. As far as we know, Xline is the first product to use
              CURP.
            </InnovationText>
          </InnovationTextWrapper>
        </Innovation>
      </InnovationWrapper>
    </>
  )
}

export default HomePage
