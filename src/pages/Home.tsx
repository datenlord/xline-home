import styled from 'styled-components'

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

const TitleContainer = styled.div`
  text-align: center;
`

const Title = styled.div`
  display: inline-block;
  position: relative;
  width: 100%;
  height: 70px;
  margin-inline: auto;
  margin-bottom: 48px;
  font-weight: 700;
  font-size: 46px;
  line-height: 61.15px;
  background-image: url(${underlineUrl});
  background-repeat: no-repeat;
  background-position: bottom 0 right 0;
`

const CoverWrapper = styled.div`
  min-width: 100%;
  height: 661px;
  background-image: url(${homeCoverUrl});
`

const Cover = styled.div`
  max-width: 1440px;
  margin-inline: auto;
  padding-top: calc(86px + 96px);
  padding-inline: 128px;
  color: white;
`

const CoverTitle = styled.img`
  height: 100px;
  margin-bottom: 32px;
`

const CoverDescription = styled.h1`
  max-width: 992px;
  margin-bottom: 32px;
  font-weight: 500;
  font-size: 39px;
  line-height: 1.5;
`

const CoverButton = styled.button`
  display: flex;
  align-items: center;
  height: 48px;
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
`

const IntroductionWrapper = styled.div`
  height: 840px;
  background: hsl(210, 20%, 98%);
`

const Introduction = styled.div`
  display: flex;
  height: inherit;
  max-width: 1440px;
  margin-inline: auto;
  padding-block: ${({ theme }) => theme.scale.xxl};
  padding-inline: ${({ theme }) => theme.scale.lg};
`

const IntroductionContent = styled.div`
  margin-right: ${({ theme }) => theme.scale.lg};
`

const IntroductionText = styled.p`
  margin-bottom: ${({ theme }) => theme.scale.md};
  font-weight: 400;
  font-size: 20px;
  line-height: 1.6;
`

const IntroductionList = styled.ul`
  padding-left: ${({ theme }) => theme.scale.lg};
`

const IntroductionListItem = styled.li`
  position: relative;
  margin-bottom: ${({ theme }) => theme.scale.sm};
  font-weight: 400;
  font-size: 20;
  line-height: 1.7;

  ::before {
    content: '';
    position: absolute;
    left: -48px;
    top: 4px;
    height: 32px;
    width: 32px;
    background: linear-gradient(90deg, #767ee5, #9966cc);
    border-radius: 50%;
  }
`

const FeaturesWrapper = styled.div`
  height: 920px;
`

const Features = styled.div`
  display: flex;
  height: inherit;
  max-width: 1440px;
  margin-inline: auto;
  padding-block: ${({ theme }) => theme.scale.xxl};
  padding-inline: ${({ theme }) => theme.scale.lg};
`

const FeaturesLeft = styled.div`
  flex-shrink: 0;
  width: 25%;
  margin-right: 32px;
`
const FeaturesTitleText = styled.h2`
  position: relative;
  margin-bottom: 128px;
  font-weight: 700;
  font-size: 46px;
  line-height: 1.4;

  ::after {
    content: '';
    z-index: -1;
    position: absolute;
    bottom: 0;
    left: 50px;
    display: inline-block;
    width: 250px;
    height: 30px;
    background-image: url(${underlineUrl});
    background-repeat: no-repeat;
    background-size: contain;
  }
`

const FeaturesTitleImg = styled.img``

const FeaturesItemContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-content: space-between;
  flex: 1;
  flex-flow: wrap;
`

const FeaturesItem = styled.div`
  width: 48%;
  height: 48%;
  padding: 16px;
  /* background-color: lightblue; */
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
`

const FeaturesItemIcon = styled.img``

const FeaturesItemTitle = styled.h3`
  margin-bottom: 16px;
  font-weight: 500;
  font-size: 28px;
  line-height: 1.2;
`

const FeaturesItemDescription = styled.p`
  font-weight: 400;
  font-weight: 16px;
  line-height: 1.5;
  color: hsla(0, 0%, 0%, 0.6);
`

const InnovationWrapper = styled.div`
  /* height: 920px; */
  z-index: -2;
  background: #f9fafb;
`

const Innovation = styled.div`
  display: flex;
  height: inherit;
  max-width: 1440px;
  margin-inline: auto;
  padding-block: ${({ theme }) => theme.scale.xxl};
  padding-inline: ${({ theme }) => theme.scale.lg};
`

const InnovationTitleContainer = styled.div`
  flex-shrink: 0;
  width: 25%;
  margin-right: 32px;
`

const InnovationImg = styled.img`
  width: 100%;
`

const InnovationTextWrapper = styled.div`
  flex: 1;
  padding: 48px;
  height: min-content;
  background: white;
  border-radius: 24px;
`
const InnovationText = styled.p`
  margin-bottom: 32px;
  font-weight: 400;
  font-size: 18px;
  line-height: 28.26px;
`

const HomePage = () => {
  return (
    <>
      <CoverWrapper>
        <Cover>
          <CoverTitle src={logoUrl} alt="Xline" />
          <CoverDescription>
            A High-Performance Geo-distributed Metadata Management System
          </CoverDescription>
          <CoverButton>get start</CoverButton>
        </Cover>
      </CoverWrapper>
      <IntroductionWrapper>
        <Introduction>
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
          <img src={introductionUrl} alt="Image" />
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
                A distributed KV storage engine for multi-cluster.
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
                A unified metadata management system.
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
                A high-performance multi-datacenter consensus protocol.
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
                Be compatible with the ETCD interface.
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
              when a consensus protocol is used. We know consensus protocols are
              popular to use to achieve high availability. For instance, Etcd
              uses the Raft protocol, which is quite popular in recently
              developed systems.
            </InnovationText>
            <InnovationText>
              Although Raft is stable and easy to implement, it takes 2 RTTs to
              complete a consensus request from the view of a client. One RTT
              takes place between the client and the leader server, and the
              leader server takes another RTT to broadcast the message to the
              follower servers. In a geo-distributed environment, an RTT is
              quite long, varying from tens of milliseconds to hundreds of
              milliseconds, so 2 RTTs are too long in such cases.
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
