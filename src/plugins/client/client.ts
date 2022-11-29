export const getBodyFromData = <T>(data: PayloadData<T>) => {
  if (data instanceof FormData) {
    return data;
  }

  return JSON.stringify(data as Partial<T>);
};

export const getPath = (path: string, apiUrl?: string, params?: URLSearchParams) => {
  let concatenatedPath = apiUrl ? apiUrl + '/' + path : path;

  if (params) {
    concatenatedPath = concatenatedPath + '?' + params.toString();
  }

  return concatenatedPath;
};

export type Deck = {
  apiUrl?: string;
}

export type ApiOptions = {
  apiUrl?: string;
}

export type ActionData = { [x: string]: string | ActionData };

export type PayloadData<T> = T | Partial<T> | FormData | ActionData;

// Api Resource Clients
class ResourceClientHelper {
  options: ApiOptions;

  constructor(options: ApiOptions) {
    this.options = options;
  }

  async #call<T>(method: string, path: string, data?: PayloadData<T>, params?: URLSearchParams): Promise<T|Array<T>> {
    const headers = new Headers();

    if (!(data instanceof FormData)) {
      headers.append('Content-Type', 'application/json');
    }

    const body = data ? getBodyFromData(data) : undefined ;

    const response = await fetch(getPath(path, this.options.apiUrl, params), { method, headers, body });

    if (!response.ok) {
      const responseContent = await response.text();
      throw new HttpError(response.status, response.statusText, responseContent);
    }

    return await response.json();
  }

  index   = <T>(path: string, params?: URLSearchParams): Promise<Array<T>>        => this.#call<T>('GET', path, undefined, params) as Promise<Array<T>>;
  show    = <T>(path: string, id: string, params?: URLSearchParams): Promise<T>     => this.#call<T>('GET', `${path}/${id}`, undefined, params) as Promise<T>;
  perform = <T>(path: string, action: string, actionData: ActionData): Promise<T> => this.#call<T>('POST', `${path}/${action}`, actionData) as Promise<T>;
}

class ResourceClient {
  protected h: ResourceClientHelper;

  constructor(helper: ResourceClientHelper) {
    this.h = helper;
  }
}

class CardResourceClient extends ResourceClient {
  index   = (params?: URLSearchParams) => this.h.index<Deck>('cards/deck', params);
}


// Public Api Client
export class ApiClient {
  #options: ApiOptions = {};

  #clients: Record<string, ResourceClient>;

  constructor(options?: ApiOptions) {
    if (options) {
      this.#options = options;
    }

    const helper = new ResourceClientHelper(this.#options);

    this.#clients = {
      card: new CardResourceClient(helper),
    };
  }

  get card() {
    return this.#clients['card'] as CardResourceClient;
  }
}

export class HttpError extends Error {
  statusCode: number;
  content: string;

  constructor(statusCode: number, message: string, content: string) {
    super(message);
    this.statusCode = statusCode;
    this.content = content;
  }
}