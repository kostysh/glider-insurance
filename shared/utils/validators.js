const Ajv = require('ajv');

// Validate given data against swagger schema and $ref
module.exports.validateWithSchemaOrRef = (schemaJson, ref, data) => {
  schemaJson = schemaJson ? schemaJson : {};// Can be null or undefined in case properties validation
  const ajv = new Ajv({
    useDefaults: true,
    coerceTypes: true
  });
  ajv.addSchema(schemaJson, 'swagger.json');
  if (typeof ref === 'object') {
    // object with rules
    ajv.validate(
      ref,
      data
    );
  } else {
    // case with reference
    ajv.validate(
      {
        $ref: `swagger.json${ref}`
      },
      data
    );
  }
  return ajv.errors !== null
    ? ajv.errorsText(ajv.errors)
    : null;
};
