import rawAwsConfig from '../../aws-exports.js'

interface AwsConfig {
  aws_appsync_graphqlEndpoint: string
  aws_appsync_apiKey: string
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

function getRequiredString(config: Record<string, unknown>, key: keyof AwsConfig): string {
  const value = config[key]

  if (typeof value !== 'string' || value.trim().length === 0) {
    throw new Error(`Invalid aws config: ${key} must be a non-empty string`)
  }

  return value
}

function parseAwsConfig(value: unknown): AwsConfig {
  if (!isRecord(value)) {
    throw new Error('Invalid aws config: expected an object')
  }

  return {
    aws_appsync_graphqlEndpoint: getRequiredString(value, 'aws_appsync_graphqlEndpoint'),
    aws_appsync_apiKey: getRequiredString(value, 'aws_appsync_apiKey'),
  }
}

export const awsConfig = parseAwsConfig(rawAwsConfig)
