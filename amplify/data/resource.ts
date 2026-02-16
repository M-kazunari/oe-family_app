import { type ClientSchema, a, defineData } from '@aws-amplify/backend';

const schema = a.schema({
  // 「Note」というテーブル（表）を作成
  Note: a.model({
    title: a.string().required(),   // タイトル（必須）
    content: a.string().required(), // 内容（必須）
    date: a.string(),               // 日付
  })
  .authorization((allow) => [allow.guest(), allow.owner()]), 
  // ↑まずは開発用に「誰でも読み書きOK」の設定（後で「家族のみ」に絞ります）
});

export type Schema = ClientSchema<typeof schema>;

export const data = defineData({
  schema,
  authorizationModes: {
    defaultAuthorizationMode: 'iam', // 開発中のサンドボックス用設定
  },
});