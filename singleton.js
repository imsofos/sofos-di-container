function singleton(classDefinition) {
    if (!singleton[classDefinition.name])
        singleton[classDefinition.name] = new classDefinition()
    return singleton[classDefinition.name]
}

module.exports = singleton