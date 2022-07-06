class User {
    constructor() { }

    getLanguage() {
        console.log(this.port)
        return this.SessionManager().get('language')
    }

    setLanguage(language) {
        return this.SessionManager().set('language', language)
    }
}

module.exports = User