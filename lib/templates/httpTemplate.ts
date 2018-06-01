// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License. See License.txt in the project root for license information.

import * as url from 'url'
import * as utils from '../util/utils'

export interface Headers {
  [name: string]: string
}

export interface Request {
  url: string|undefined
  method: any
  body: any
  headers: Headers
}

export interface Response {
  body: any
  headers: Headers
}

export interface Responses {
  longrunning: {
    initialResponse: Response
    finalResponse: Response
  }
  standard: {
    finalResponse: Response
  }
}

export class HttpTemplate {

  constructor(public readonly request: Request, public readonly responses: Responses) {
  }

  getHost(): string|undefined {
    const requestUrl = this.request.url
    return requestUrl
      ? url.parse(requestUrl).host
      : 'management.azure.com'
  }

  getCurlRequestHeaders(padding?: any): string {
    let result = ``
    if (!padding) padding = ``
    if (this.request.body) {
      result += `\n${padding}-H 'Content-Length: ${JSON.stringify(this.request.body).length}' \\`
    }
    if (this.request.headers) {
      const headers = utils.getKeys(this.request.headers)

      for (let i = 0; i < headers.length; i++) {
        const headerName = headers[i]
        result += `\n${padding}-H '${headerName}: ${this.request.headers[headerName]}' \\`
      }
    }
    return result
  }

  getRequestBody(): string {
    let body = ``
    if (this.request && this.request.body !== null && this.request.body !== undefined) {
      body = JSON.stringify(this.request.body)
    }
    return body
  }

  //The format for request body in Curl has been inspired from the following links:
  // - https://stackoverflow.com/questions/34847981/curl-with-multiline-of-json
  // - https://ok-b.org/t/34847981/curl-with-multiline-of-json
  getCurlRequestBody(padding?: string): string {
    let body = ``
    if (!padding) padding = ``
    if (this.request && this.request.body !== null && this.request.body !== undefined) {
      body =
        `\n${padding}-d @- << EOF\n${padding}${JSON.stringify(this.request.body, null, 2).split(`\n`).join(`\n${padding}`)}\n${padding}EOF`
    }
    return body
  }

  getResponseBody(response: Response): string {
    let body = ``
    if (response && response.body !== null && response.body !== undefined) {
      body = JSON.stringify(response.body)
    }
    return body
  }
}
