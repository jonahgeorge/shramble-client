const WEBAPP_URL = "http://localhost:4000"

interface ResponseData {
  [key: string]: string
}
interface Response {
  status: number,
  ok: boolean,
  data: ResponseData
}

export async function makePostRequest(path: string, body: object): Promise<Response> {
  try {
    const request = await fetch(WEBAPP_URL + path, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('shrambleToken') || 'undefined'
      },
      body: JSON.stringify(body)
    })

    return {
      status: request.status,
      ok: request.ok,
      data: await request.json()
    }
  } catch (error) {
    // TODO This should only handle actual errors not 400/500 responses
    console.error(error)

    return {
      status: 500,
      ok: false,
      data: {'error': String(error)}
    }
  }
}

export async function makeGetRequest(path: string): Promise<Response> {
  try {
    const request = await fetch(WEBAPP_URL + path, {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': sessionStorage.getItem('shrambleToken') || 'undefined'
      }
    })

    return {
      status: request.status,
      ok: request.ok,
      data: await request.json()
    }
  } catch (error) {
    // TODO This should only handle actual errors not 400/500 responses
    console.error(error)

    return {
      status: 500,
      ok: false,
      data: { 'error': String(error) }
    }
  }
}


