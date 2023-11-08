// import CryptoJS from "crypto-js";


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

// export const generateRandomKey = () => {
//     const uuid = CryptoJS.lib.WordArray.random(16);

//     // Format the UUID as a string with hyphens.
//     const formattedKey = `${uuid.toString()}`
//         .replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');

//     return formattedKey
// };
