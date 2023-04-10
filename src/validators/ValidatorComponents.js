/* eslint no-useless-escape: 0 */

export const validImage = value => {
    if (!value) {
        return true
    }
    if (typeof value !== 'string') {
        return false
    }
    const validFormats = ['jpg', 'jpeg', 'png', 'svg']
    const extenstion = value.split('.').pop()
    return validFormats.includes(extenstion)
}

export const validUrl = value => {
    if (!value) {
        return true
    }
    if (typeof value !== 'string') {
        return false
    }
    const expression = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g
    const regex = new RegExp(expression)

    return value.match(regex) ? true : false
}

export const samePassword = (getValue, password) => props => {
    if (!props) {
        return true
    }
    if (typeof props !== 'string') {
        return false
    }

    const compareValue = getValue()[password]
    return compareValue === props
}