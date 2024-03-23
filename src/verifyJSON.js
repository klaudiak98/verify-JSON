function verifyJSON (data) {
    if (typeof data !== 'object' || data === null) return false
    if (!data['PolicyName'] || !data['PolicyDocument']) return false
    if (typeof data['PolicyName'] !== 'string' || typeof data['PolicyDocument'] !== 'object') return false
    if (!(/[\w+=,.@-]+/gi).test(data['PolicyName'])) return false
    if (data['PolicyName'].length < 1 || data['PolicyName'].length > 128) return false

    try {
        const resource = data['PolicyDocument']['Statement'].find(el => el['Resource'])['Resource']
        if (resource === '*') return false
    } catch (e) {
        return false
    }

    return true
}

export default verifyJSON
