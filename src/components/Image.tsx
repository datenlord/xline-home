import styled from 'styled-components'

interface ImageProps {
  src: string | undefined
  alt: string | undefined
}

const StyledImage = styled.img`
  display: block;
  max-width: 90%;
  margin-block: 32px;
  margin-inline: auto;
  border-radius: 12px;
  @media screen and (max-width: 768px) {
    margin-block: 24px;
  }
`

export const Image: React.FC<ImageProps> = ({ src, alt }) => (
  <StyledImage src={src} alt={alt} />
)
