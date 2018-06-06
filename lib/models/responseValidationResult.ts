/*
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Licensed under the MIT License. See License.txt in the project root for
 * license information.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is
 * regenerated.
 */

/**
 * @class
 * Initializes a new instance of the ResponseValidationResult class.
 * @constructor
 * Describes the validation result of the live response.
 *
 * @member {boolean} [successfulResponse] Describes the status of live response
 * validation.
 *
 * @member {array} [operationInfo] The corresponding operation(s) in openapi
 * spec that was used for validating the response.
 *
 * @member {array} [errors] Provides more information about live response
 * validation.
 *
 */
export class ResponseValidationResult {

  /**
   * Defines the metadata of ResponseValidationResult
   *
   * @returns {object} metadata of ResponseValidationResult
   *
   */
  public mapper() {
    return {
      required: false,
      serializedName: "ResponseValidationResult",
      type: {
        name: "Composite",
        className: "ResponseValidationResult",
        modelProperties: {
          successfulResponse: {
            required: false,
            readOnly: true,
            serializedName: "successfulResponse",
            type: {
              name: "Boolean"
            }
          },
          operationInfo: {
            required: false,
            readOnly: true,
            serializedName: "operationInfo",
            type: {
              name: "Sequence",
              element: {
                required: false,
                serializedName: "OperationInfoElementType",
                type: {
                  name: "Composite",
                  className: "OperationInfo"
                }
              }
            }
          },
          errors: {
            required: false,
            readOnly: true,
            serializedName: "errors",
            type: {
              name: "Sequence",
              element: {
                required: false,
                serializedName: "ErrorWrapperElementType",
                type: {
                  name: "Composite",
                  className: "ErrorWrapper"
                }
              }
            }
          }
        }
      }
    }
  }
}
