import styled from 'styled-components'

import coverUrl from '@/assets/contribute-cover.svg'
import underlineUrl from '@/assets/underline.svg'
import howUrl from '@/assets/contribute-how.svg'
import protocolIconUrl from '@/assets/protocol-icon.svg'
import severIconUrl from '@/assets/sever-icon.svg'

const CoverWrapper = styled.div`
  display: flex;
  align-items: center;
  height: calc(86px + 586px);
  padding-top: 86px;
  color: white;
  background-image: url(${coverUrl});
  background-repeat: no-repeat;
  background-size: cover;
`

const CoverContainer = styled.div`
  width: 100%;
  max-width: ${props => props.theme.scale.scale12};
  margin-inline: auto;
  padding-inline: 128px;
`

const CoverTitle = styled.h1`
  margin-bottom: ${props => props.theme.scale.scale04};
  font-weight: 700;
  font-size: 72px;
  line-height: 80.64px;
  text-transform: capitalize;
`

const CoverDescription = styled.p`
  font-weight: 500;
  font-size: 30px;
  line-height: 45px;
`

const HowWrapper = styled.div`
  // - - -
  /* min-height: 400px;
  background: lightblue; */
`

const HowContainer = styled.div`
  /* text-align: center; */
  max-width: ${props => props.theme.scale.scale12};
  margin-inline: auto;
  padding-inline: ${props => props.theme.scale.scale07};
  padding-block: ${props => props.theme.scale.scale06};
  // - - -
  /* min-height: 400px;
  background: lightcoral; */
`

const TitleContainer = styled.div`
  text-align: center;
`

const Title = styled.div`
  display: inline-block;
  position: relative;
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

const Description = styled.p`
  text-align: center;
  margin-bottom: 48px;
  font-weight: 500;
  font-size: 28px;
  line-height: 44.25px;
`

const HowMainContainer = styled.div`
  display: flex;
  align-items: center;
  text-align: left;
`

const HowMainText = styled.p`
  height: min-content;
  padding: ${props => props.theme.scale.scale06};
  background: #f9fafb;
  font-weight: 600;
  font-size: 28px;
  line-height: 44.25px;
  border-radius: 24px;
`

const HowMainImg = styled.img``

const AreaWrapper = styled.div`
  background: #f9fafb;
  // - - -
  min-height: 400px;
`

const AreaContainer = styled.div`
  width: 100%;
  max-width: ${props => props.theme.scale.scale12};
  margin-inline: auto;
  padding-inline: 128px;
  padding-block: ${props => props.theme.scale.scale06};
`

const AreaMainContainer = styled.div`
  display: flex;
  justify-content: space-between;
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
  // - - -
  height: 400px;
`

const AreaIcon = styled.img`
  margin-bottom: 32px;
`

const AreaTitle = styled.h3`
  margin-bottom: 32px;
  font-weight: 500;
  font-size: 28px;
  line-height: 44.25px;
`

const AreaDescription = styled.p`
  font-weight: 400;
  font-size: 18px;
  line-height: 28.26px;
`

const IssueWrapper = styled.div``

const IssueContainer = styled.div`
  max-width: ${props => props.theme.scale.scale12};
  margin-inline: auto;
  padding-inline: ${props => props.theme.scale.scale07};
  padding-block: ${props => props.theme.scale.scale06};
`

const IssueMainContainer = styled.div`
  padding: 64px;
  background: #f9fafb;
  border-radius: 24px;
  text-align: left;
`
const IssueText = styled.p`
  font-weight: 400;
  font-size: 22px;
  line-height: 34.76px;
`

const IssueList = styled.ul`
  list-style-type: disc;
`

const IssueListItem = styled.li`
  font-weight: 400;
  font-size: 22px;
  line-height: 34.76px;
`

const QuestionWrapper = styled.div`
  background: #f9fafb;
`

const QuestionContainer = styled.div`
  max-width: ${props => props.theme.scale.scale12};
  margin-inline: auto;
  padding-inline: ${props => props.theme.scale.scale07};
  padding-block: ${props => props.theme.scale.scale06};
`

const QuestionMain = styled.p`
  text-align: center;
  font-weight: 500;
  font-size: 28px;
  line-height: 44.25px;
  margin-bottom: ${props => props.theme.scale.scale07};
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
            <Title>How to be a contributor?</Title>
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
            <Description>
              For beginners, we have prepared many suitable tasks for you. You
              can check out, for example, our Help Wanted issues in the TiKV
              repository.
            </Description>
            <IssueMainContainer>
              <IssueText>
                See below for some commonly used labels across major
                repositories listed in:
              </IssueText>
              <IssueList>
                <IssueListItem>
                  bug - Indicates an unexpected problem or unintended behavior;
                  it can be small or big in scope
                </IssueListItem>
                <IssueListItem>
                  good first issue - An ideal first issue to work on for
                  first-time contributors, with mentoring available
                </IssueListItem>
                <IssueListItem>
                  help wanted - Indicates that a maintainer wants help on an
                  issue or pull request
                </IssueListItem>
                <IssueListItem>
                  discussion - Status: Under discussion or needs discussion
                </IssueListItem>
                <IssueListItem>
                  enhancement - New feature or request
                </IssueListItem>
                <IssueListItem>
                  question - Further information is requested, or the question
                  is to be answered.
                </IssueListItem>
              </IssueList>
            </IssueMainContainer>
          </TitleContainer>
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
            Gitter.
          </QuestionMain>
        </QuestionContainer>
      </QuestionWrapper>
    </>
  )
}

export default ContributePage
