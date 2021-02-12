const conversionController = function () {
    const convertV1 = async function (rawDataString:string) {
        console.log('In convertV1 Controller')
        if (rawDataString === '') {
            throw new Error('Insufficent data passed. Unable to convert data.')
        } else {
            const rawSplitData:string[] = []
            let foundZero:boolean = false
            for (let i:number = 0; i < rawDataString.length; i++) {
                if(rawDataString[i] === '0') {
                    foundZero = true
                } else if (foundZero) {
                    rawSplitData.push(rawDataString.substring(0, i))
                    rawDataString = rawDataString.substr(i)
                    foundZero = false
                    i = 0
                } else if (i+1 === rawDataString.length) {
                    rawSplitData.push(rawDataString.substring(0, i+1))
                }
            }

            return {
                firstName: rawSplitData[0],
                lastName: rawSplitData[1],
                clientId: rawSplitData[2]
            }
        }
    }

    const convertV2 = async function (rawDataString:string) {
        console.log('In convertV2 Controller')
        if (rawDataString === '') {
            throw new Error('Insufficent data passed. Unable to convert data.')
        } else {
            let splitData:string[] = rawDataString.split('0').filter(x => x !== '')
            
            return {
                firstName: splitData[0],
                lastName: splitData[1],
                clientId: `${splitData[2].substr(0, 3)}-${splitData[2].substr(3)}`
            }
        }
    }
    return {
        convertV1: convertV1,
        convertV2: convertV2
    }
}
module.exports = conversionController