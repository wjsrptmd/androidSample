import {BASE_URL} from '@env';

export class ApiClientError extends Error {
  constructor(readonly status: number, readonly code: string, message: string) {
    super(message);
    Object.setPrototypeOf(this, ApiClientError.prototype);
  }
}

export class ApiClient {
  static baseUrl = BASE_URL;

  static async requestGet(path: string): Promise<any> {
    const url = `${this.baseUrl}${path}`;
    console.log(url);
    const res = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return await this.responseToJson(res);
  }

  static async requestPost(
    path: string,
    body: any,
    parseJson: boolean = true,
  ): Promise<any> {
    const url = `${this.baseUrl}${path}`;

    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (parseJson) {
      return await this.responseToJson(res);
    }
  }

  static async requestPut(path: string, body: any): Promise<any> {
    const url = `${this.baseUrl}${path}`;

    const res = await fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    return await this.responseToJson(res);
  }

  static async requestDelete(
    path: string,
    parseJson: boolean = true,
  ): Promise<any> {
    const url = `${this.baseUrl}${path}`;

    const res = await fetch(url, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (parseJson) {
      return await this.responseToJson(res);
    }
  }

  private static async responseToJson(res: Response) {
    if (!res.ok) {
      let resBody: any;
      try {
        resBody = await res.json();
      } catch (e) {
        throw new ApiClientError(
          res.status,
          'FailedToParseResponse',
          res.statusText,
        );
      }

      if (resBody.error) {
        throw new ApiClientError(
          res.status,
          resBody.error.code,
          resBody.error.message,
        );
      } else {
        throw new ApiClientError(res.status, 'UnknownError', res.statusText);
      }
    }

    return await res.json();
  }
}
