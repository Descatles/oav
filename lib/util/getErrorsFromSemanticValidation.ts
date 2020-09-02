import { SpecValidationResult } from "../validators/specValidator"

import { BaseValidationError } from "./baseValidationError"
import { errorCodeToErrorMetadata, NodeError, serializeErrors } from "./validationError"
import { ValidationResultSource } from "./validationResultSource"

export interface SemanticValidationError extends BaseValidationError<NodeError<any>> {
  source?: ValidationResultSource
  path?: string
  readonly inner?: {}
  readonly "json-path"?: string
}

interface ValidationResult {
  readonly validateSpec: {
    readonly errors: ReadonlyArray<SemanticValidationError>
  }
}

/**
 * From the raw validator engine semantic validation results process errors to be served.
 */
export const getErrorsFromSemanticValidation = (
  validationResult: SpecValidationResult & ValidationResult
): SemanticValidationError[] => {
  if (!validationResult.validateSpec || !validationResult.validateSpec.errors) {
    return []
  }
  let curSemanticError: SemanticValidationError[] = validationResult.validateSpec.errors.map(x => {
    return { ...x }
  })
  let newSemanticError: SemanticValidationError[] = validationResult.validateSpec.errors.map(x => {
    return { ...x }
  })
  do {
    curSemanticError = newSemanticError
    newSemanticError = curSemanticError.reduce((acc, rawError) => {
      const serializedErrors: any[] = serializeErrors(rawError.inner || rawError, [])
      // process serialized errors
      const semanticErrors: SemanticValidationError[] = serializedErrors.map(serializedError => {
        const severity = errorCodeToErrorMetadata(serializedError.code).severity
        const semanticError: SemanticValidationError = {
          source: ValidationResultSource.GLOBAL,
          code: serializedError.code,
          details: serializedError,
          path: rawError["json-path"],
          severity
        }
        return semanticError
      })
      return [...acc, ...semanticErrors]
    }, new Array<SemanticValidationError>())
  } while (curSemanticError.length !== newSemanticError.length)
  return curSemanticError.filter(
    it =>
      it.code !== "ANY_OF_MISSING" && it.code !== "ONE_OF_MISSING" && it.code !== "ONR_OF_MULTIPLE"
  )
}
