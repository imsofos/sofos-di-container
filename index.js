const container = require('./register');


const userInstance = container.getInstance('User');
userInstance.setLanguage('en')
userInstance.setLanguage('ir')
const lang = userInstance.getLanguage()
console.log(lang)