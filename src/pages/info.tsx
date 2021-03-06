import React from 'react'

import { useLocation, Link } from 'react-router-dom'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components/macro'

import Results from 'components/results'
import Header from 'components/header'
import Footer from 'components/footer'
import Title from 'components/title'
import ShareResults from 'components/share-results'
import ScrollAnchor from 'components/scroll-anchor'

const useQuery = () => {
  const location = useLocation()
  return new URLSearchParams(location.search)
}

const InfoCard = styled.div`
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  background: ${props => props.theme.colors.backgroundLight};
  border-radius: 12px;
  margin: 12px;
  padding: 16px;
  max-width: 1000px;
  align-items: center;
  flex-shrink: 0;
`

const Audience = styled.div`
  color: ${props => props.theme.colors.text};
  margin: 15px 15px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1000px;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: center;
`

const HeaderLinkContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  flex-direction: column;
  margin-top: 16px;
`

const HeaderLink = styled(Link)`
  align-items: center;
  transition: background 200ms linear;
  font-size: ${props => props.theme.sizes.buttonText};
  font-family: ${props => props.theme.fontFamily};
  font-weight: 500;
  border-radius: 28px;
  padding: calc(${props => props.theme.sizes.buttonText} * 0.75) 24px;
  box-shadow: 0 5px 20px rgba(0, 0, 0, 0.1);
  min-width: 6em;
  margin: 3px;
  color: #fff;
  text-decoration: none;
  background: #079af3;
  display: block;
  text-align: center;
  flex-shrink: 0;
  &:hover {
    opacity: 0.7;
  }
`

const HeaderLinkSubTitle = styled.div`
  color: ${props => props.theme.colors.text};
  font-size: ${props => props.theme.sizes.buttonText};
  padding: 8px 12px;
  text-decoration: none;
  border-radius: 12px;
  display: flex;
  align-items: center;
  font-weight: normal;
  flex-shrink: 0;
  text-align: center;
`

const ClassList = styled.h4`
  margin: 0 8px 0 12px;
  font-size: 18px;
  font-weight: normal;
`

const InfoPageContainer = styled.div`
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Spacer = styled.div`
  flex-grow: 1;
`

export const InfoPage: React.FC = () => {
  const query = useQuery()
  const { t } = useTranslation()

  // parse /info?id=a,b,c -> [a, b, c]
  const queryClasses = query.get('id')
  const classes = queryClasses ? queryClasses.split(',') : []

  // build a comma separated, readable list of classes
  const classString = classes
    .map(className => t(`classes.${className}`))
    .join(', ')

  const hasClasses = classes.length > 0

  return (
    <InfoPageContainer>
      <ScrollAnchor />
      <Header />
      <Title>{t('resultsPage.headerTitle')}</Title>
      <Audience>
        <ClassList>
          {t('resultsPage.audiencePrefix')} {classString}
        </ClassList>
        <HeaderLinkContainer>
          <HeaderLinkSubTitle>
            {t('resultsPage.changeAudienceTitle')}
          </HeaderLinkSubTitle>
          <HeaderLink to="/chat/">{t('resultsPage.changeAudience')}</HeaderLink>
        </HeaderLinkContainer>
      </Audience>
      <InfoCard>
        {hasClasses ? (
          <Results classes={classes} />
        ) : (
          <div>
            <h2>{t('resultsPage.noResultsMessage')}</h2>
            <div>
              <Link to="/chat/">{t('resultsPage.changeAudience')}</Link>
            </div>
          </div>
        )}
      </InfoCard>
      <Spacer />
      <ShareResults classes={classes} />
      <Footer />
    </InfoPageContainer>
  )
}

export default InfoPage
