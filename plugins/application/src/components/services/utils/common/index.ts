import { SecurityTypeEnum } from '../enum/index';

export const securityItems = [
  //{ label: SecurityTypeEnum.none, value: SecurityTypeEnum.none },
  { label: SecurityTypeEnum.keyAuth, value: SecurityTypeEnum.keyAuth },
  { label: SecurityTypeEnum.oAuth2, value: SecurityTypeEnum.oAuth2 },
];

export const rateLimitingItems = [
  { label: '0', value: 0 },
  { label: '120', value: 120 },
];

export const statusItems = [
  { label: 'active', value: 'true' },
  { label: 'disable', value: 'false' },
];

export const rateLimitingTypeItems = [
  { label: '/second', value: "second" },
  { label: '/minute', value: "minute" },
  { label: '/hour', value: "hour" },
  { label: '/day', value: "day" },
  { label: '/month', value: "month" },
  { label: '/year', value: "year" },
]

export const rateLimitingLimitByItems = [
  { label: '/consumer', value: "consumer" },
  { label: '/ip', value: 'ip' },
];
