import { NextRequest, NextResponse } from 'next/server'

const POSTHOG_API_KEY = process.env.POSTHOG_API_KEY
const POSTHOG_PROJECT_ID = process.env.POSTHOG_PROJECT_ID
const POSTHOG_HOST = process.env.POSTHOG_HOST || 'https://app.posthog.com'

export async function POST(request: NextRequest) {
  if (!POSTHOG_API_KEY || !POSTHOG_PROJECT_ID) {
    return NextResponse.json(
      { error: 'PostHog configuration missing' },
      { status: 500 }
    )
  }

  try {
    const body = await request.json()

    const response = await fetch(
      `${POSTHOG_HOST}/api/projects/${POSTHOG_PROJECT_ID}/query/`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${POSTHOG_API_KEY}`,
        },
        body: JSON.stringify(body),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      console.error('PostHog API error:', error)
      return NextResponse.json(
        { error: 'PostHog API error', details: error },
        { status: response.status }
      )
    }

    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error('Query route error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
