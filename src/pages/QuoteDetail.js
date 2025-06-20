import React, { Fragment, useEffect } from 'react'
import { Routes, useParams, Route, Link } from 'react-router'
import Comments from '../components/comments/Comments'
import HighlightedQuote from '../components/quotes/HighlightedQuote'
import useHttp from '../hooks/use-http'
import { getSingleQuote } from '../lib/api'
import LoadingSpinner from '../components/UI/LoadingSpinner'



const QuoteDetail = () => {
  const {sendRequest, status, data : loadedQuote, error} = useHttp(getSingleQuote, true);

    const params = useParams()
    const { quoteId } = params

    useEffect(() => {
      sendRequest(quoteId)
    }, [sendRequest, quoteId])

    if(status === 'pending'){
      return (
        <div className='centered'>
          <LoadingSpinner />
        </div>
      )
    }

    if(error){
      return <p className='centered focused'>{error}</p>
    }
    if(!loadedQuote.text){
      return <p className='centered'>No Quote Found!</p>
    }

  return (
    <Fragment>
        <HighlightedQuote text={loadedQuote.text} author={loadedQuote.author} />
        <div className='centered'>
          <Link to='comments' className='btn--flat' >Add a Comment</Link>
        </div>
        <Routes>

            <Route path='comments' element={<Comments />} />
        </Routes>

    </Fragment>
  )
}

export default QuoteDetail