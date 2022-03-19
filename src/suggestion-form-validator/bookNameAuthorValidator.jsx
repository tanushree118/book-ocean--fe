export const bookNameValidator = (suggestionDetails) => {
    return getErrorForEmptyBookName(suggestionDetails) || ""
}

const getErrorForEmptyBookName = (suggestionDetails) => {
    return !suggestionDetails.bookName && "Enter book name"
}

export const authorValidator = (suggestionDetails) => {
    return getErrorForEmptyAuthor(suggestionDetails) || ""
}

const getErrorForEmptyAuthor = (suggestionDetails) => {
    return !suggestionDetails.author && "Enter author name"
}