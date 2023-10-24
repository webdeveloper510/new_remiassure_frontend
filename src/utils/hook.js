export const commaSeperator = (value) => {
    let data = value?.toString();
    const [integerPart, decimalPart] = data?.split('.')
    const formattedIntegerPart = integerPart?.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    if (decimalPart !== undefined) {
        return formattedIntegerPart + "." + decimalPart
    } else {
        return formattedIntegerPart
    }
}

export const commaRemover = (value) => {
    let data = value;
    if (data.includes(',')) {
        let amt = data.split(",")
        return amt.join("")
    } else {
        return data
    }
}