class SessionManager {
    constructor() {
        this.session = {};
    }

    get(key) {
        return this.session[key];
    }

    set(key, value) {
        const prevLang = this.User().getLanguage()
        console.log(`prev lang was ${prevLang}`)
        this.session[key] = value;
        return 1;
    }
}

module.exports = SessionManager