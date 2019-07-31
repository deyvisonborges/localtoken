class LocalToken{
    constructor() {
        this._localtoken = {};
    }

    // insere uma key com um value
    setInLocal(key, value) {
        return this._localtoken[key] = value;
    }

    // busca o value de uma key
    getInLocal(key) {
        return this._localtoken[key];
    }

    // remove o objeto com a key
    removeLocal (key) {
        return delete this._localtoken[key];
    }
}

module.exports = new LocalToken;

