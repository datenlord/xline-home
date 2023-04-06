import { DefaultTheme } from 'styled-components'

declare module 'styled-components' {
  export interface DefaultTheme {
    color: {
      neutral: {
        gray01: '#ffffff'
        gray02: '#fafafa'
        gray03: '#f5f5f5'
        gray04: '#f0f0f0'
        gray05: '#d9d9d9'
        gray06: '#bfbfbf'
        gray07: '#8c8c8c'
        gray08: '#595959'
        gray09: '#434343'
        gray10: '#262626'
        gray11: '#1f1f1f'
        gray12: '#141414'
        gray13: '#000000'
      }
      white: 'white'
    }
    scale: {
      scale01: '8px'
      scale02: '12px'
      scale03: '20px'
      scale04: '32px'
      scale05: '48px'
      scale06: '80px'
      scale07: '128px'
      scale08: '208px'
      scale09: '336px'
      scale10: '552px'
      scale11: '896px'
      scale12: '1440px'
      // - - -
      sm: '16px'
      md: '32px'
      lg: '64px'
      xl: '96px'
      xxl: '128px'
    }
    font: {
      // font-family
      fontFamily: 'Arial'
      // font-size
      fontSize1: '12px'
      fontSize2: '14px'
      fontSize3: '16px'
      fontSize4: '20px'
      fontSize5: '24px'
      fontSize6: '30px'
      fontSize7: '38px'
      fontSize8: '46px'
      fontSize9: '56px'
      fontSize10: '68px'
      // line-height
      lineHeight1: '20px'
      lineHeight2: '22px'
      lineHeight3: '24px'
      lineHeight4: '28px'
      lineHeight5: '32px'
      lineHeight6: '38px'
      lineHeight7: '46px'
      lineHeight8: '54px'
      lineHeight9: '64px'
      lineHeight10: '76px'
      // font-weight
      fontWeightRegular: '500'
      fontWeightBold: '600'
    }
  }
}

export const theme: DefaultTheme = {
  color: {
    neutral: {
      gray01: '#ffffff',
      gray02: '#fafafa',
      gray03: '#f5f5f5',
      gray04: '#f0f0f0',
      gray05: '#d9d9d9',
      gray06: '#bfbfbf',
      gray07: '#8c8c8c',
      gray08: '#595959',
      gray09: '#434343',
      gray10: '#262626',
      gray11: '#1f1f1f',
      gray12: '#141414',
      gray13: '#000000',
    },
    white: 'white',
  },
  scale: {
    scale01: '8px',
    scale02: '12px',
    scale03: '20px',
    scale04: '32px',
    scale05: '48px',
    scale06: '80px',
    scale07: '128px',
    scale08: '208px',
    scale09: '336px',
    scale10: '552px',
    scale11: '896px',
    scale12: '1440px',
    // - - -
    sm: '16px',
    md: '32px',
    lg: '64px',
    xl: '96px',
    xxl: '128px',
  },
  font: {
    // font-family
    fontFamily: 'Arial',
    // font-size
    fontSize1: '12px',
    fontSize2: '14px',
    fontSize3: '16px',
    fontSize4: '20px',
    fontSize5: '24px',
    fontSize6: '30px',
    fontSize7: '38px',
    fontSize8: '46px',
    fontSize9: '56px',
    fontSize10: '68px',
    // line-height
    lineHeight1: '20px',
    lineHeight2: '22px',
    lineHeight3: '24px',
    lineHeight4: '28px',
    lineHeight5: '32px',
    lineHeight6: '38px',
    lineHeight7: '46px',
    lineHeight8: '54px',
    lineHeight9: '64px',
    lineHeight10: '76px',
    // font-weight
    fontWeightRegular: '500',
    fontWeightBold: '600',
  },
}
