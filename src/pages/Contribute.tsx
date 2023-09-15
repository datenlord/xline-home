import styled from 'styled-components'

import coverUrl from '@/assets/contribute-cover.svg'
import underlineUrl from '@/assets/underline.svg'
import howUrl from '@/assets/contribute-how.svg'
import protocolIconUrl from '@/assets/protocol-icon.svg'
import severIconUrl from '@/assets/sever-icon.svg'

const TitleContainer = styled.div`
  text-align: center;
  margin-bottom: 24px;
  @media screen and (max-width: 1024px) {
    margin-bottom: 18px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 12px;
  }
`
const Title = styled.div`
  display: inline-block;
  position: relative;
  margin-inline: auto;
  font-weight: 700;
  font-size: 46px;
  line-height: 2;
  background-image: url(${underlineUrl});
  background-repeat: no-repeat;
  background-position: bottom 0 right 0;
  background-size: 50%;
  @media screen and (max-width: 1024px) {
    font-size: 34.5px;
    line-height: 1.3;
  }
  @media screen and (max-width: 768px) {
    font-size: 23px;
  }
`
const Description = styled.p`
  text-align: center;
  margin-bottom: 48px;
  font-weight: 500;
  font-size: 28px;
  line-height: 1.5;
  @media screen and (max-width: 1024px) {
    margin-bottom: 36px;
    font-size: 21px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 24px;
    font-size: 14px;
  }
`
// - - -
const CoverWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-block: calc(160px + 86px);
  color: white;
  background-image: url(${coverUrl});
  background-repeat: no-repeat;
  background-size: cover;
  @media screen and (max-width: 1024px) {
    padding-block: calc(120px + 69px);
  }
  @media screen and (max-width: 768px) {
    padding-block: calc(80px + 53px);
  }
`
const CoverContainer = styled.div`
  width: 100%;
  max-width: ${props => props.theme.scale.scale12};
  margin-inline: auto;
  padding-inline: 128px;
  @media screen and (max-width: 1024px) {
    padding-inline: 96px;
  }
  @media screen and (max-width: 768px) {
    padding-inline: 64px;
  }
`
const CoverTitle = styled.h1`
  margin-bottom: 20px;
  font-weight: 700;
  font-size: 72px;
  line-height: 80px;
  text-transform: capitalize;
  @media screen and (max-width: 1024px) {
    margin-bottom: 15px;
    font-size: 54px;
    line-height: 60px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 10px;
    font-size: 36px;
    line-height: 40px;
  }
`
const CoverDescription = styled.p`
  font-weight: 500;
  font-size: 30px;
  line-height: 1.5;
  @media screen and (max-width: 1024px) {
    font-size: 22.5px;
  }
  @media screen and (max-width: 768px) {
    font-size: 22.5px;
  }
`
// - - -
const HowWrapper = styled.div``
const HowContainer = styled.div`
  max-width: ${props => props.theme.scale.scale12};
  margin-inline: auto;
  padding-inline: 128px;
  padding-block: 80px;
  line-height: 1.5;
  @media screen and (max-width: 1024px) {
    padding-inline: 96px;
    padding-block: 60px;
  }
  @media screen and (max-width: 768px) {
    padding-inline: 64px;
    padding-block: 40px;
  }
`
const HowMainContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`
const HowMainText = styled.p`
  height: min-content;
  padding: ${props => props.theme.scale.scale06};
  background: #f9fafb;
  font-weight: 600;
  font-size: 28px;
  line-height: 1.5;
  border-radius: 24px;
  @media screen and (max-width: 1024px) {
    padding: 60px;
    font-size: 21px;
    border-radius: 18px;
  }
  @media screen and (max-width: 768px) {
    padding: 40px;
    font-size: 14px;
    border-radius: 12px;
    margin-bottom: 24px;
  }
  @media screen and (max-width: 768px) {
    padding: 20px;
  }
`
const HowMainImg = styled.img`
  width: 40%;
  @media screen and (max-width: 425px) {
    width: 70%;
  }
`
// - - -
const AreaWrapper = styled.div`
  background: #f9fafb;
`
const AreaContainer = styled.div`
  width: 100%;
  max-width: ${props => props.theme.scale.scale12};
  margin-inline: auto;
  padding-inline: 128px;
  padding-block: ${props => props.theme.scale.scale06};
  @media screen and (max-width: 1024px) {
    padding-inline: 96px;
    padding-block: 60px;
  }
  @media screen and (max-width: 768px) {
    padding-inline: 64px;
    padding-block: 40px;
  }
`
const AreaMainContainer = styled.div`
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 768px) {
    flex-direction: column;
  }
`
const AreaCard = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  width: 48%;
  padding: 64px;
  background: #fff;
  box-shadow: 0px 2px 15px -4px rgba(0, 0, 0, 0.11);
  border-radius: 24px;
  @media screen and (max-width: 1024px) {
    padding: 48px;
    border-radius: 18px;
  }
  @media screen and (max-width: 768px) {
    padding: 32px;
    border-radius: 12px;
    width: 100%;
    margin-bottom: 24px;
    :last-child {
      margin-bottom: 0;
    }
  }
`
const AreaIcon = styled.img`
  width: 54px;
  margin-bottom: 32px;
  @media screen and (max-width: 1024px) {
    width: 40.5px;
  }
  @media screen and (max-width: 768px) {
    width: 27px;
  }
`
const AreaTitle = styled.h3`
  margin-bottom: 32px;
  font-weight: 500;
  font-size: 28px;
  line-height: 1.5;
  @media screen and (max-width: 1024px) {
    font-size: 21px;
    margin-bottom: 24px;
  }
  @media screen and (max-width: 768px) {
    font-size: 14px;
    margin-bottom: 16px;
  }
`
const AreaDescription = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 1.5;
  @media screen and (max-width: 1024px) {
    font-size: 13.5px;
  }
  @media screen and (max-width: 768px) {
    font-size: 9px;
  }
`
// - - -
const IssueWrapper = styled.div``
const IssueContainer = styled.div`
  max-width: ${props => props.theme.scale.scale12};
  margin-inline: auto;
  padding-inline: ${props => props.theme.scale.scale07};
  padding-block: ${props => props.theme.scale.scale06};
  @media screen and (max-width: 1024px) {
    padding-inline: 96px;
    padding-block: 60px;
  }
  @media screen and (max-width: 768px) {
    padding-inline: 64px;
    padding-block: 40px;
  }
`
const IssueMainContainer = styled.div`
  padding: 64px;
  background: #f9fafb;
  border-radius: 24px;
  text-align: left;
  @media screen and (max-width: 1024px) {
    padding: 48px;
    border-radius: 18px;
  }
  @media screen and (max-width: 768px) {
    padding: 32px;
    border-radius: 12px;
  }
`
const IssueText = styled.p`
  font-weight: 400;
  font-size: 22px;
  line-height: 1.6;
  @media screen and (max-width: 1024px) {
    font-size: 16.5px;
  }
  @media screen and (max-width: 768px) {
    font-size: 11px;
  }
`
const IssueList = styled.ul`
  list-style-type: disc;
  padding-left: 2em;
`
const IssueListItem = styled.li`
  font-weight: 400;
  font-size: 22px;
  line-height: 1.6;
  @media screen and (max-width: 1024px) {
    font-size: 16.5px;
  }
  @media screen and (max-width: 768px) {
    font-size: 11px;
  }
`
// - - -
const QuestionWrapper = styled.div`
  background: #f9fafb;
`
const QuestionContainer = styled.div`
  max-width: ${props => props.theme.scale.scale12};
  margin-inline: auto;
  padding-inline: ${props => props.theme.scale.scale07};
  padding-block: ${props => props.theme.scale.scale06};
  @media screen and (max-width: 1024px) {
    padding-inline: 96px;
    padding-block: 60px;
  }
  @media screen and (max-width: 768px) {
    padding-inline: 64px;
    padding-block: 40px;
  }
`
const QuestionMain = styled.p`
  text-align: center;
  font-weight: 500;
  font-size: 28px;
  line-height: 1.5;
  margin-bottom: 256px;
  @media screen and (max-width: 1024px) {
    margin-bottom: 192px;
    font-size: 21px;
  }
  @media screen and (max-width: 768px) {
    margin-bottom: 128px;
    font-size: 14px;
  }
`

const ContributePage = () => {
  return (
    <>
      <CoverWrapper>
        <CoverContainer>
          <CoverTitle>contribute</CoverTitle>
          <CoverDescription>
            As an open-source project, Xline cannot grow without the support and
            participation of contributors from the community. If you would like
            to contribute to this project, be it Xline's code, documentation, or
            even our website, we would appreciate your help. We are glad to
            provide any support along the way.
          </CoverDescription>
        </CoverContainer>
      </CoverWrapper>
      <HowWrapper>
        <HowContainer>
          <TitleContainer>
            <Title>How to be a contributor?</Title>
          </TitleContainer>
          <HowMainContainer>
            <HowMainText>
              As soon as a PR(Pull Request) proposed by you is approved and
              merged, you can become an Xline contributor！
            </HowMainText>
            <HowMainImg src={howUrl} alt="image" />
          </HowMainContainer>
        </HowContainer>
      </HowWrapper>
      <AreaWrapper>
        <AreaContainer>
          <TitleContainer>
            <Title>Pick an area to contribute</Title>
          </TitleContainer>
          <Description>
            You can choose one of the following areas to contribute to:
          </Description>
          <AreaMainContainer>
            <AreaCard>
              <AreaIcon src={protocolIconUrl} alt="icon" />
              <AreaTitle>CURP Protocol</AreaTitle>
              <AreaDescription>
                The CURP distributed consensus algorithm implemented in Rust.
                Read Contribute to Xline for details on how to make
                contributions to the CURP code base.
              </AreaDescription>
            </AreaCard>
            <AreaCard>
              <AreaIcon src={severIconUrl} alt="icon" />
              <AreaTitle>Xline Server</AreaTitle>
              <AreaDescription>
                The Xline distributed KV storage backend implemented in Rust.
                Read Contribute to Xline for details on how to make
                contributions to the CURP code base.
              </AreaDescription>
            </AreaCard>
          </AreaMainContainer>
        </AreaContainer>
      </AreaWrapper>
      <IssueWrapper>
        <IssueContainer>
          <TitleContainer>
            <Title>Find an issue to work on</Title>
          </TitleContainer>
          <Description>
            For beginners, we have prepared many suitable tasks for you. You can
            check out, for example, our Help Wanted issues in the repository.
          </Description>
          <IssueMainContainer>
            <IssueText>
              See below for some commonly used labels across major repositories
              listed in:
            </IssueText>
            <IssueList>
              <IssueListItem>
                bug - Indicates an unexpected problem or unintended behavior; it
                can be small or big in scope
              </IssueListItem>
              <IssueListItem>
                good first issue - An ideal first issue to work on for
                first-time contributors, with mentoring available
              </IssueListItem>
              <IssueListItem>
                help wanted - Indicates that a maintainer wants help on an issue
                or pull request
              </IssueListItem>
              <IssueListItem>
                discussion - Status: Under discussion or needs discussion
              </IssueListItem>
              <IssueListItem>
                enhancement - New feature or request
              </IssueListItem>
              <IssueListItem>
                question - Further information is requested, or the question is
                to be answered.
              </IssueListItem>
            </IssueList>
          </IssueMainContainer>
        </IssueContainer>
      </IssueWrapper>
      <QuestionWrapper>
        <QuestionContainer>
          <TitleContainer>
            <Title>Ask a question</Title>
          </TitleContainer>
          <QuestionMain>
            If you need any help to get started, understand the codebase, or
            make a PR(or anything else really), please feel free to ask us on
            <a href="https://discord.gg/8PrRCP3s"> Discord</a>.
          </QuestionMain>
        </QuestionContainer>
      </QuestionWrapper>
    </>
  )
}

export default ContributePage
