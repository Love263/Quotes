const FIREBASE_DOMAIN = `https://quote-5b838-default-rtdb.firebaseio.com`;

export async function getAllQuotes(){
    const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`)
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || 'Could not fetch all quotes!')
    }

    const transformedQuotes = [];
    for(const key in data){
        const quoteObj = {
            id : key,
            ...data[key]
        }

        transformedQuotes.push(quoteObj)
    }
    return transformedQuotes;
}

export async function getSingleQuote(quoteId){
    const response = await fetch(`${FIREBASE_DOMAIN}/quotes/${quoteId}.json`)
    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message || 'Could not fetch the quote!')
    }

    const loadedQuote = {
        id : quoteId,
        ...data
    }
    return loadedQuote
}

export async function addQuote(quoteData){
    const response = await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
        method : 'POST',
        body : JSON.stringify(quoteData),
        headers : {
            'Content-type' : 'application/json'
        }
    })

    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message || 'Could not add a quote!')
    }
    return null
}

export async function addComment(requestData){
    const response = await fetch(`${FIREBASE_DOMAIN}/comments/${requestData.quoteId}.json`, {
        method : 'POST',
        body : JSON.stringify(requestData.commentData),
        headers : {
            'Content-type' : 'application/json'
        }
    })

    const data = await response.json();
    if(!response.ok){
        throw new Error(data.message || 'Could not add a comment!')
    }
    return { commendId : data.name}
}

export async function getAllComments(quoteId){
    const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`)
    const data = await response.json();

    if(!response.ok){
        throw new Error(data.message || 'Could not fetch all comments!')
    }

    const transformedComments = [];
    for(const key in data){
        const commentObj = {
            id : key,
            ...data[key]
        }

        transformedComments.push(commentObj)
    }
    return transformedComments;
}


