// return a new object with only properties from propertiesToCopy(an array contains propertis that want to be copied)
function filterProperties(originObject, propertiesToCopy) {
    return Object.keys(originObject).reduce(function(obj, key) {
        if (propertiesToCopy.includes(key)) {
            obj[key] = originObject[key];
        }
        return obj;
    }, {});
}

module.exports = { filterProperties };