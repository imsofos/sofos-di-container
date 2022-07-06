const singleton = require('./singleton');

class Container {

    constructor({ injectionMode }) {
        this.bindings = {}
        this.injectionMode = injectionMode
    }

    register(bindings) {
        const keys = Object.keys(bindings)
        const setups = [];
        for (let i = 0; i < keys.length; i++) {
            const abstract = keys[i];
            const { type, setup, factory } = bindings[abstract];
            if (typeof setup == 'function')
                setups.push(setup)
            this.bindings[abstract] = { factory, type }
        }
        setups.forEach(setup => setup())
    }

    get(abstract) {
        const { factory, type } = this.bindings[abstract];
        switch (type) {
            case 'class':
                return () => singleton(factory());
            case 'value':
                return factory;
        }
    }

    getInstance(abstract) {
        const { factory, type } = this.bindings[abstract];
        if (type != 'class')
            throw 'this method only callable for classes'
        return new (factory())()
    }

    asValue(factory) {
        return {
            type: 'value',
            factory
        }
    }

    asClass(classDefinition, dependencies) {
        return {
            type: 'class',
            setup: () => {
                if (this.injectionMode == 'prototype')
                    dependencies.forEach(dependency => classDefinition.prototype[dependency] = this.get(dependency))
                if (this.injectionMode == 'constructor')
                    dependencies.forEach(dependency => classDefinition = classDefinition.bind(classDefinition, this.get(dependency)))
            },
            factory: () => classDefinition
        }
    }
}
module.exports = Container