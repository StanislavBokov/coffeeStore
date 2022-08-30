const tokenService = require('../services/token.service')

module.exports = function(role) {

    return function (req, res, next) {
        if(req.method === ' OPTIONS') {
            return next()
        }
    
        try {
            // Bearer mlkmdflkmfdmg
            const token = req.headers.authorization.split(' ')[1]
            if(!token) {
                return res.status(401).json({ message: 'Unauthorized' })
            }
    
            const data = tokenService.validateAccess(token)
            
            if(data.role !== role) {
                return res.status(403).json({ message: "Нет доступа" })
            }

            req.user = data
    
            next()
    
        } catch (error) {
            res.status(401).json({ message: 'Unauthorized' })
        }
    }
}

