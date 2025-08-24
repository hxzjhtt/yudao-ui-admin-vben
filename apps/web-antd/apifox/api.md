---
title: teach
language_tabs:
  - shell: Shell
  - http: HTTP
  - javascript: JavaScript
  - ruby: Ruby
  - python: Python
  - php: PHP
  - java: Java
  - go: Go
toc_footers: []
includes: []
search: true
code_clipboard: true
highlight_theme: darkula
headingLevel: 2
generator: '@tarslib/widdershins v4.0.30'
---

# teach

Base URLs:

# Authentication

- API Key (Authorization)
  - Parameter Name: **Authorization**, in: header.

# 管理后台 - 播客

<a id="opIdupdatePodcast"></a>

## PUT 更新播客

PUT /admin-api/platform/podcast/update

> Body 请求参数

```json
{
  "id": "327",
  "categoryId": "20080",
  "podcastName": "李四",
  "grade": "string",
  "subject": "string",
  "remark": "随便",
  "icon": "string",
  "background": "string"
}
```

### 请求参数

| 名称 | 位置 | 类型 | 必选 | 说明 |
| --- | --- | --- | --- | --- |
| tenant-id | header | integer(int32) | 否 | 租户编号 |
| Authorization | header | string | 否 | 认证 Token |
| body | body | [PodcastSaveReqVO](#schemapodcastsavereqvo) | 是 | none |

> 返回示例

> 200 Response

```
{"code":0,"data":true,"msg":"string"}
```

### 返回结果

| 状态码 | 状态码含义 | 说明 | 数据模型 |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | OK | [CommonResultBoolean](#schemacommonresultboolean) |

<a id="opIdcreatePodcast"></a>

## POST 创建播客

POST /admin-api/platform/podcast/create

> Body 请求参数

```json
{
  "id": "327",
  "categoryId": "20080",
  "podcastName": "李四",
  "grade": "string",
  "subject": "string",
  "remark": "随便",
  "icon": "string",
  "background": "string"
}
```

### 请求参数

| 名称 | 位置 | 类型 | 必选 | 说明 |
| --- | --- | --- | --- | --- |
| tenant-id | header | integer(int32) | 否 | 租户编号 |
| Authorization | header | string | 否 | 认证 Token |
| body | body | [PodcastSaveReqVO](#schemapodcastsavereqvo) | 是 | none |

> 返回示例

> 200 Response

```
{"code":0,"data":"string","msg":"string"}
```

### 返回结果

| 状态码 | 状态码含义 | 说明 | 数据模型 |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | OK | [CommonResultString](#schemacommonresultstring) |

<a id="opIdgetPodcastPage_1"></a>

## GET 获得播客分页

GET /admin-api/platform/podcast/page

### 请求参数

| 名称 | 位置 | 类型 | 必选 | 说明 |
| --- | --- | --- | --- | --- |
| categoryId | query | string | 否 | 平台播客分类id |
| categoryIds | query | string | 否 | 多分类 |
| domain | query | string | 否 | 域和categoryId互斥 ，如学科，名著，故事等 ，从字典来 |
| podcastName | query | string | 否 | 播客名称 |
| grade | query | string | 否 | 推荐年级 |
| subject | query | string | 否 | 学科 |
| remark | query | string | 否 | 介绍 |
| icon | query | string | 否 | 图标 |
| background | query | string | 否 | 背景图片 |
| createTime | query | string | 否 | 创建时间 |
| pageNo | query | string | 是 | 页码，从 1 开始 |
| pageSize | query | string | 是 | 每页条数，最大值为 100 |
| tenant-id | header | integer(int32) | 否 | 租户编号 |
| Authorization | header | string | 否 | 认证 Token |

> 返回示例

> 200 Response

```
{"code":0,"data":{"list":[{"id":"327","categoryId":"20080","podcastName":"李四","grade":"string","subject":"string","remark":"随便","icon":"string","background":"string","createTime":"2019-08-24T14:15:22Z"}],"total":0},"msg":"string"}
```

### 返回结果

| 状态码 | 状态码含义 | 说明 | 数据模型 |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | OK | [CommonResultPageResultPodcastRespVO](#schemacommonresultpageresultpodcastrespvo) |

<a id="opIdgetPodcast_1"></a>

## GET 获得播客

GET /admin-api/platform/podcast/get

### 请求参数

| 名称          | 位置   | 类型           | 必选 | 说明       |
| ------------- | ------ | -------------- | ---- | ---------- |
| id            | query  | string         | 是   | 编号       |
| tenant-id     | header | integer(int32) | 否   | 租户编号   |
| Authorization | header | string         | 否   | 认证 Token |

> 返回示例

> 200 Response

```
{"code":0,"data":{"id":"327","categoryId":"20080","podcastName":"李四","grade":"string","subject":"string","remark":"随便","icon":"string","background":"string","createTime":"2019-08-24T14:15:22Z"},"msg":"string"}
```

### 返回结果

| 状态码 | 状态码含义 | 说明 | 数据模型 |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | OK | [CommonResultPodcastRespVO](#schemacommonresultpodcastrespvo) |

<a id="opIdexportPodcastExcel"></a>

## GET 导出播客 Excel

GET /admin-api/platform/podcast/export-excel

### 请求参数

| 名称 | 位置 | 类型 | 必选 | 说明 |
| --- | --- | --- | --- | --- |
| categoryId | query | string | 否 | 平台播客分类id |
| categoryIds | query | string | 否 | 多分类 |
| domain | query | string | 否 | 域和categoryId互斥 ，如学科，名著，故事等 ，从字典来 |
| podcastName | query | string | 否 | 播客名称 |
| grade | query | string | 否 | 推荐年级 |
| subject | query | string | 否 | 学科 |
| remark | query | string | 否 | 介绍 |
| icon | query | string | 否 | 图标 |
| background | query | string | 否 | 背景图片 |
| createTime | query | string | 否 | 创建时间 |
| pageNo | query | string | 是 | 页码，从 1 开始 |
| pageSize | query | string | 是 | 每页条数，最大值为 100 |
| tenant-id | header | integer(int32) | 否 | 租户编号 |
| Authorization | header | string | 否 | 认证 Token |

### 返回结果

| 状态码 | 状态码含义 | 说明 | 数据模型 |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | OK | None |

<a id="opIddeletePodcast"></a>

## DELETE 删除播客

DELETE /admin-api/platform/podcast/delete

### 请求参数

| 名称          | 位置   | 类型           | 必选 | 说明       |
| ------------- | ------ | -------------- | ---- | ---------- |
| id            | query  | string         | 是   | 编号       |
| tenant-id     | header | integer(int32) | 否   | 租户编号   |
| Authorization | header | string         | 否   | 认证 Token |

> 返回示例

> 200 Response

```
{"code":0,"data":true,"msg":"string"}
```

### 返回结果

| 状态码 | 状态码含义 | 说明 | 数据模型 |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | OK | [CommonResultBoolean](#schemacommonresultboolean) |

<a id="opIddeletePodcastList"></a>

## DELETE 批量删除播客

DELETE /admin-api/platform/podcast/delete-list

### 请求参数

| 名称          | 位置   | 类型           | 必选 | 说明       |
| ------------- | ------ | -------------- | ---- | ---------- |
| ids           | query  | array[string]  | 是   | 编号       |
| tenant-id     | header | integer(int32) | 否   | 租户编号   |
| Authorization | header | string         | 否   | 认证 Token |

> 返回示例

> 200 Response

```
{"code":0,"data":true,"msg":"string"}
```

### 返回结果

| 状态码 | 状态码含义 | 说明 | 数据模型 |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | OK | [CommonResultBoolean](#schemacommonresultboolean) |

# 管理后台 - 平台播客分类

<a id="opIdupdatePodcastCategory"></a>

## PUT 更新平台播客分类

PUT /admin-api/platform/podcast-category/update

> Body 请求参数

```json
{
  "id": "19919",
  "podcastCategoryName": "王五",
  "pid": "27218",
  "sort": 0,
  "domain": "string"
}
```

### 请求参数

| 名称 | 位置 | 类型 | 必选 | 说明 |
| --- | --- | --- | --- | --- |
| tenant-id | header | integer(int32) | 否 | 租户编号 |
| Authorization | header | string | 否 | 认证 Token |
| body | body | [PodcastCategorySaveReqVO](#schemapodcastcategorysavereqvo) | 是 | none |

> 返回示例

> 200 Response

```
{"code":0,"data":true,"msg":"string"}
```

### 返回结果

| 状态码 | 状态码含义 | 说明 | 数据模型 |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | OK | [CommonResultBoolean](#schemacommonresultboolean) |

<a id="opIdcreatePodcastCategory"></a>

## POST 创建平台播客分类

POST /admin-api/platform/podcast-category/create

> Body 请求参数

```json
{
  "id": "19919",
  "podcastCategoryName": "王五",
  "pid": "27218",
  "sort": 0,
  "domain": "string"
}
```

### 请求参数

| 名称 | 位置 | 类型 | 必选 | 说明 |
| --- | --- | --- | --- | --- |
| tenant-id | header | integer(int32) | 否 | 租户编号 |
| Authorization | header | string | 否 | 认证 Token |
| body | body | [PodcastCategorySaveReqVO](#schemapodcastcategorysavereqvo) | 是 | none |

> 返回示例

> 200 Response

```
{"code":0,"data":"string","msg":"string"}
```

### 返回结果

| 状态码 | 状态码含义 | 说明 | 数据模型 |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | OK | [CommonResultString](#schemacommonresultstring) |

<a id="opIdgetPodcastCategoryPage"></a>

## GET 获得平台播客分类分页

GET /admin-api/platform/podcast-category/page

### 请求参数

| 名称 | 位置 | 类型 | 必选 | 说明 |
| --- | --- | --- | --- | --- |
| podcastCategoryName | query | string | 否 | 播客分类名称 |
| pid | query | string | 否 | 父id |
| sort | query | string | 否 | 排序 |
| domain | query | string | 否 | 域，如学科，名著，故事等 ，从字典来 |
| createTime | query | string | 否 | 创建时间 |
| pageNo | query | string | 是 | 页码，从 1 开始 |
| pageSize | query | string | 是 | 每页条数，最大值为 100 |
| tenant-id | header | integer(int32) | 否 | 租户编号 |
| Authorization | header | string | 否 | 认证 Token |

> 返回示例

> 200 Response

```
{"code":0,"data":{"list":[{"id":"19919","podcastCategoryName":"王五","pid":"27218","sort":0,"domain":"string","createTime":"2019-08-24T14:15:22Z"}],"total":0},"msg":"string"}
```

### 返回结果

| 状态码 | 状态码含义 | 说明 | 数据模型 |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | OK | [CommonResultPageResultPodcastCategoryRespVO](#schemacommonresultpageresultpodcastcategoryrespvo) |

<a id="opIdgetPodcastCategory"></a>

## GET 获得平台播客分类

GET /admin-api/platform/podcast-category/get

### 请求参数

| 名称          | 位置   | 类型           | 必选 | 说明       |
| ------------- | ------ | -------------- | ---- | ---------- |
| id            | query  | string         | 是   | 编号       |
| tenant-id     | header | integer(int32) | 否   | 租户编号   |
| Authorization | header | string         | 否   | 认证 Token |

> 返回示例

> 200 Response

```
{"code":0,"data":{"id":"19919","podcastCategoryName":"王五","pid":"27218","sort":0,"domain":"string","createTime":"2019-08-24T14:15:22Z"},"msg":"string"}
```

### 返回结果

| 状态码 | 状态码含义 | 说明 | 数据模型 |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | OK | [CommonResultPodcastCategoryRespVO](#schemacommonresultpodcastcategoryrespvo) |

<a id="opIdexportPodcastCategoryExcel"></a>

## GET 导出平台播客分类 Excel

GET /admin-api/platform/podcast-category/export-excel

### 请求参数

| 名称 | 位置 | 类型 | 必选 | 说明 |
| --- | --- | --- | --- | --- |
| podcastCategoryName | query | string | 否 | 播客分类名称 |
| pid | query | string | 否 | 父id |
| sort | query | string | 否 | 排序 |
| domain | query | string | 否 | 域，如学科，名著，故事等 ，从字典来 |
| createTime | query | string | 否 | 创建时间 |
| pageNo | query | string | 是 | 页码，从 1 开始 |
| pageSize | query | string | 是 | 每页条数，最大值为 100 |
| tenant-id | header | integer(int32) | 否 | 租户编号 |
| Authorization | header | string | 否 | 认证 Token |

### 返回结果

| 状态码 | 状态码含义 | 说明 | 数据模型 |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | OK | None |

<a id="opIddeletePodcastCategory"></a>

## DELETE 删除平台播客分类

DELETE /admin-api/platform/podcast-category/delete

### 请求参数

| 名称          | 位置   | 类型           | 必选 | 说明       |
| ------------- | ------ | -------------- | ---- | ---------- |
| id            | query  | string         | 是   | 编号       |
| tenant-id     | header | integer(int32) | 否   | 租户编号   |
| Authorization | header | string         | 否   | 认证 Token |

> 返回示例

> 200 Response

```
{"code":0,"data":true,"msg":"string"}
```

### 返回结果

| 状态码 | 状态码含义 | 说明 | 数据模型 |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | OK | [CommonResultBoolean](#schemacommonresultboolean) |

<a id="opIddeletePodcastCategoryList"></a>

## DELETE 批量删除平台播客分类

DELETE /admin-api/platform/podcast-category/delete-list

### 请求参数

| 名称          | 位置   | 类型           | 必选 | 说明       |
| ------------- | ------ | -------------- | ---- | ---------- |
| ids           | query  | array[string]  | 是   | 编号       |
| tenant-id     | header | integer(int32) | 否   | 租户编号   |
| Authorization | header | string         | 否   | 认证 Token |

> 返回示例

> 200 Response

```
{"code":0,"data":true,"msg":"string"}
```

### 返回结果

| 状态码 | 状态码含义 | 说明 | 数据模型 |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | OK | [CommonResultBoolean](#schemacommonresultboolean) |

# 管理后台 - 平台播客分类推荐

<a id="opIdupdatePodcastCategoryRecommend"></a>

## PUT 更新平台播客分类推荐

PUT /admin-api/platform/podcast-category-recommend/update

> Body 请求参数

```json
{
  "id": "16416",
  "categoryId": "24043",
  "grade": "string"
}
```

### 请求参数

| 名称 | 位置 | 类型 | 必选 | 说明 |
| --- | --- | --- | --- | --- |
| tenant-id | header | integer(int32) | 否 | 租户编号 |
| Authorization | header | string | 否 | 认证 Token |
| body | body | [PodcastCategoryRecommendSaveReqVO](#schemapodcastcategoryrecommendsavereqvo) | 是 | none |

> 返回示例

> 200 Response

```
{"code":0,"data":true,"msg":"string"}
```

### 返回结果

| 状态码 | 状态码含义 | 说明 | 数据模型 |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | OK | [CommonResultBoolean](#schemacommonresultboolean) |

<a id="opIdcreatePodcastCategoryRecommend"></a>

## POST 创建平台播客分类推荐

POST /admin-api/platform/podcast-category-recommend/create

> Body 请求参数

```json
{
  "id": "16416",
  "categoryId": "24043",
  "grade": "string"
}
```

### 请求参数

| 名称 | 位置 | 类型 | 必选 | 说明 |
| --- | --- | --- | --- | --- |
| tenant-id | header | integer(int32) | 否 | 租户编号 |
| Authorization | header | string | 否 | 认证 Token |
| body | body | [PodcastCategoryRecommendSaveReqVO](#schemapodcastcategoryrecommendsavereqvo) | 是 | none |

> 返回示例

> 200 Response

```
{"code":0,"data":"string","msg":"string"}
```

### 返回结果

| 状态码 | 状态码含义 | 说明 | 数据模型 |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | OK | [CommonResultString](#schemacommonresultstring) |

<a id="opIdgetPodcastCategoryRecommendPage"></a>

## GET 获得平台播客分类推荐分页

GET /admin-api/platform/podcast-category-recommend/page

### 请求参数

| 名称          | 位置   | 类型           | 必选 | 说明                   |
| ------------- | ------ | -------------- | ---- | ---------------------- |
| categoryId    | query  | string         | 否   | 平台播客分类id         |
| grade         | query  | string         | 否   | 推荐年级               |
| createTime    | query  | string         | 否   | 创建时间               |
| pageNo        | query  | string         | 是   | 页码，从 1 开始        |
| pageSize      | query  | string         | 是   | 每页条数，最大值为 100 |
| tenant-id     | header | integer(int32) | 否   | 租户编号               |
| Authorization | header | string         | 否   | 认证 Token             |

> 返回示例

> 200 Response

```
{"code":0,"data":{"list":[{"id":"16416","categoryId":"24043","grade":"string","createTime":"2019-08-24T14:15:22Z"}],"total":0},"msg":"string"}
```

### 返回结果

| 状态码 | 状态码含义 | 说明 | 数据模型 |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | OK | [CommonResultPageResultPodcastCategoryRecommendRespVO](#schemacommonresultpageresultpodcastcategoryrecommendrespvo) |

<a id="opIdgetPodcastCategoryRecommend"></a>

## GET 获得平台播客分类推荐

GET /admin-api/platform/podcast-category-recommend/get

### 请求参数

| 名称          | 位置   | 类型           | 必选 | 说明       |
| ------------- | ------ | -------------- | ---- | ---------- |
| id            | query  | string         | 是   | 编号       |
| tenant-id     | header | integer(int32) | 否   | 租户编号   |
| Authorization | header | string         | 否   | 认证 Token |

> 返回示例

> 200 Response

```
{"code":0,"data":{"id":"16416","categoryId":"24043","grade":"string","createTime":"2019-08-24T14:15:22Z"},"msg":"string"}
```

### 返回结果

| 状态码 | 状态码含义 | 说明 | 数据模型 |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | OK | [CommonResultPodcastCategoryRecommendRespVO](#schemacommonresultpodcastcategoryrecommendrespvo) |

<a id="opIdexportPodcastCategoryRecommendExcel"></a>

## GET 导出平台播客分类推荐 Excel

GET /admin-api/platform/podcast-category-recommend/export-excel

### 请求参数

| 名称          | 位置   | 类型           | 必选 | 说明                   |
| ------------- | ------ | -------------- | ---- | ---------------------- |
| categoryId    | query  | string         | 否   | 平台播客分类id         |
| grade         | query  | string         | 否   | 推荐年级               |
| createTime    | query  | string         | 否   | 创建时间               |
| pageNo        | query  | string         | 是   | 页码，从 1 开始        |
| pageSize      | query  | string         | 是   | 每页条数，最大值为 100 |
| tenant-id     | header | integer(int32) | 否   | 租户编号               |
| Authorization | header | string         | 否   | 认证 Token             |

### 返回结果

| 状态码 | 状态码含义 | 说明 | 数据模型 |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | OK | None |

<a id="opIddeletePodcastCategoryRecommend"></a>

## DELETE 删除平台播客分类推荐

DELETE /admin-api/platform/podcast-category-recommend/delete

### 请求参数

| 名称          | 位置   | 类型           | 必选 | 说明       |
| ------------- | ------ | -------------- | ---- | ---------- |
| id            | query  | string         | 是   | 编号       |
| tenant-id     | header | integer(int32) | 否   | 租户编号   |
| Authorization | header | string         | 否   | 认证 Token |

> 返回示例

> 200 Response

```
{"code":0,"data":true,"msg":"string"}
```

### 返回结果

| 状态码 | 状态码含义 | 说明 | 数据模型 |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | OK | [CommonResultBoolean](#schemacommonresultboolean) |

<a id="opIddeletePodcastCategoryRecommendList"></a>

## DELETE 批量删除平台播客分类推荐

DELETE /admin-api/platform/podcast-category-recommend/delete-list

### 请求参数

| 名称          | 位置   | 类型           | 必选 | 说明       |
| ------------- | ------ | -------------- | ---- | ---------- |
| ids           | query  | array[string]  | 是   | 编号       |
| tenant-id     | header | integer(int32) | 否   | 租户编号   |
| Authorization | header | string         | 否   | 认证 Token |

> 返回示例

> 200 Response

```
{"code":0,"data":true,"msg":"string"}
```

### 返回结果

| 状态码 | 状态码含义 | 说明 | 数据模型 |
| --- | --- | --- | --- |
| 200 | [OK](https://tools.ietf.org/html/rfc7231#section-6.3.1) | OK | [CommonResultBoolean](#schemacommonresultboolean) |

# 数据模型

<h2 id="tocS_CommonResultBoolean">CommonResultBoolean</h2>

<a id="schemacommonresultboolean"></a> <a id="schema_CommonResultBoolean"></a> <a id="tocScommonresultboolean"></a> <a id="tocscommonresultboolean"></a>

```json
{
  "code": 0,
  "data": true,
  "msg": "string"
}
```

### 属性

| 名称 | 类型           | 必选  | 约束 | 中文名 | 说明 |
| ---- | -------------- | ----- | ---- | ------ | ---- |
| code | integer(int32) | false | none |        | none |
| data | boolean        | false | none |        | none |
| msg  | string         | false | none |        | none |

<h2 id="tocS_PodcastSaveReqVO">PodcastSaveReqVO</h2>

<a id="schemapodcastsavereqvo"></a> <a id="schema_PodcastSaveReqVO"></a> <a id="tocSpodcastsavereqvo"></a> <a id="tocspodcastsavereqvo"></a>

```json
{
  "id": "327",
  "categoryId": "20080",
  "podcastName": "李四",
  "grade": "string",
  "subject": "string",
  "remark": "随便",
  "icon": "string",
  "background": "string"
}
```

管理后台 - 播客新增/修改 Request VO

### 属性

| 名称        | 类型   | 必选  | 约束 | 中文名 | 说明           |
| ----------- | ------ | ----- | ---- | ------ | -------------- |
| id          | string | true  | none |        | id             |
| categoryId  | string | true  | none |        | 平台播客分类id |
| podcastName | string | true  | none |        | 播客名称       |
| grade       | string | true  | none |        | 推荐年级       |
| subject     | string | true  | none |        | 学科           |
| remark      | string | false | none |        | 介绍           |
| icon        | string | false | none |        | 图标           |
| background  | string | false | none |        | 背景图片       |

<h2 id="tocS_PodcastCategorySaveReqVO">PodcastCategorySaveReqVO</h2>

<a id="schemapodcastcategorysavereqvo"></a> <a id="schema_PodcastCategorySaveReqVO"></a> <a id="tocSpodcastcategorysavereqvo"></a> <a id="tocspodcastcategorysavereqvo"></a>

```json
{
  "id": "19919",
  "podcastCategoryName": "王五",
  "pid": "27218",
  "sort": 0,
  "domain": "string"
}
```

管理后台 - 平台播客分类新增/修改 Request VO

### 属性

| 名称 | 类型 | 必选 | 约束 | 中文名 | 说明 |
| --- | --- | --- | --- | --- | --- |
| id | string | true | none |  | id |
| podcastCategoryName | string | true | none |  | 播客分类名称 |
| pid | string | true | none |  | 父id |
| sort | integer(int32) | true | none |  | 排序 |
| domain | string | true | none |  | 域，如学科，名著，故事等 ，从字典来 |

<h2 id="tocS_PodcastCategoryRecommendSaveReqVO">PodcastCategoryRecommendSaveReqVO</h2>

<a id="schemapodcastcategoryrecommendsavereqvo"></a> <a id="schema_PodcastCategoryRecommendSaveReqVO"></a> <a id="tocSpodcastcategoryrecommendsavereqvo"></a> <a id="tocspodcastcategoryrecommendsavereqvo"></a>

```json
{
  "id": "16416",
  "categoryId": "24043",
  "grade": "string"
}
```

管理后台 - 平台播客分类推荐新增/修改 Request VO

### 属性

| 名称       | 类型   | 必选 | 约束 | 中文名 | 说明           |
| ---------- | ------ | ---- | ---- | ------ | -------------- |
| id         | string | true | none |        | id             |
| categoryId | string | true | none |        | 平台播客分类id |
| grade      | string | true | none |        | 推荐年级       |

<h2 id="tocS_CommonResultString">CommonResultString</h2>

<a id="schemacommonresultstring"></a> <a id="schema_CommonResultString"></a> <a id="tocScommonresultstring"></a> <a id="tocscommonresultstring"></a>

```json
{
  "code": 0,
  "data": "string",
  "msg": "string"
}
```

### 属性

| 名称 | 类型           | 必选  | 约束 | 中文名 | 说明 |
| ---- | -------------- | ----- | ---- | ------ | ---- |
| code | integer(int32) | false | none |        | none |
| data | string         | false | none |        | none |
| msg  | string         | false | none |        | none |

<h2 id="tocS_CommonResultPageResultPodcastRespVO">CommonResultPageResultPodcastRespVO</h2>

<a id="schemacommonresultpageresultpodcastrespvo"></a> <a id="schema_CommonResultPageResultPodcastRespVO"></a> <a id="tocScommonresultpageresultpodcastrespvo"></a> <a id="tocscommonresultpageresultpodcastrespvo"></a>

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "id": "327",
        "categoryId": "20080",
        "podcastName": "李四",
        "grade": "string",
        "subject": "string",
        "remark": "随便",
        "icon": "string",
        "background": "string",
        "createTime": "2019-08-24T14:15:22Z"
      }
    ],
    "total": 0
  },
  "msg": "string"
}
```

### 属性

| 名称 | 类型 | 必选 | 约束 | 中文名 | 说明 |
| --- | --- | --- | --- | --- | --- |
| code | integer(int32) | false | none |  | none |
| data | [PageResultPodcastRespVO](#schemapageresultpodcastrespvo) | false | none |  | 分页结果 |
| msg | string | false | none |  | none |

<h2 id="tocS_PageResultPodcastRespVO">PageResultPodcastRespVO</h2>

<a id="schemapageresultpodcastrespvo"></a> <a id="schema_PageResultPodcastRespVO"></a> <a id="tocSpageresultpodcastrespvo"></a> <a id="tocspageresultpodcastrespvo"></a>

```json
{
  "list": [
    {
      "id": "327",
      "categoryId": "20080",
      "podcastName": "李四",
      "grade": "string",
      "subject": "string",
      "remark": "随便",
      "icon": "string",
      "background": "string",
      "createTime": "2019-08-24T14:15:22Z"
    }
  ],
  "total": 0
}
```

分页结果

### 属性

| 名称 | 类型 | 必选 | 约束 | 中文名 | 说明 |
| --- | --- | --- | --- | --- | --- |
| list | [[PodcastRespVO](#schemapodcastrespvo)] | true | none |  | 数据 |
| total | integer(int64) | true | none |  | 总量 |

<h2 id="tocS_PodcastRespVO">PodcastRespVO</h2>

<a id="schemapodcastrespvo"></a> <a id="schema_PodcastRespVO"></a> <a id="tocSpodcastrespvo"></a> <a id="tocspodcastrespvo"></a>

```json
{
  "id": "327",
  "categoryId": "20080",
  "podcastName": "李四",
  "grade": "string",
  "subject": "string",
  "remark": "随便",
  "icon": "string",
  "background": "string",
  "createTime": "2019-08-24T14:15:22Z"
}
```

管理后台 - 播客 Response VO

### 属性

| 名称        | 类型              | 必选  | 约束 | 中文名 | 说明           |
| ----------- | ----------------- | ----- | ---- | ------ | -------------- |
| id          | string            | true  | none |        | id             |
| categoryId  | string            | true  | none |        | 平台播客分类id |
| podcastName | string            | true  | none |        | 播客名称       |
| grade       | string            | true  | none |        | 推荐年级       |
| subject     | string            | true  | none |        | 学科           |
| remark      | string            | false | none |        | 介绍           |
| icon        | string            | false | none |        | 图标           |
| background  | string            | false | none |        | 背景图片       |
| createTime  | string(date-time) | true  | none |        | 创建时间       |

<h2 id="tocS_CommonResultPodcastRespVO">CommonResultPodcastRespVO</h2>

<a id="schemacommonresultpodcastrespvo"></a> <a id="schema_CommonResultPodcastRespVO"></a> <a id="tocScommonresultpodcastrespvo"></a> <a id="tocscommonresultpodcastrespvo"></a>

```json
{
  "code": 0,
  "data": {
    "id": "327",
    "categoryId": "20080",
    "podcastName": "李四",
    "grade": "string",
    "subject": "string",
    "remark": "随便",
    "icon": "string",
    "background": "string",
    "createTime": "2019-08-24T14:15:22Z"
  },
  "msg": "string"
}
```

### 属性

| 名称 | 类型 | 必选 | 约束 | 中文名 | 说明 |
| --- | --- | --- | --- | --- | --- |
| code | integer(int32) | false | none |  | none |
| data | [PodcastRespVO](#schemapodcastrespvo) | false | none |  | 管理后台 - 播客 Response VO |
| msg | string | false | none |  | none |

<h2 id="tocS_PodcastCategoryRespVO">PodcastCategoryRespVO</h2>

<a id="schemapodcastcategoryrespvo"></a> <a id="schema_PodcastCategoryRespVO"></a> <a id="tocSpodcastcategoryrespvo"></a> <a id="tocspodcastcategoryrespvo"></a>

```json
{
  "id": "19919",
  "podcastCategoryName": "王五",
  "pid": "27218",
  "sort": 0,
  "domain": "string",
  "createTime": "2019-08-24T14:15:22Z"
}
```

管理后台 - 平台播客分类 Response VO

### 属性

| 名称 | 类型 | 必选 | 约束 | 中文名 | 说明 |
| --- | --- | --- | --- | --- | --- |
| id | string | true | none |  | id |
| podcastCategoryName | string | true | none |  | 播客分类名称 |
| pid | string | true | none |  | 父id |
| sort | integer(int32) | true | none |  | 排序 |
| domain | string | true | none |  | 域，如学科，名著，故事等 ，从字典来 |
| createTime | string(date-time) | true | none |  | 创建时间 |

<h2 id="tocS_CommonResultPageResultPodcastCategoryRespVO">CommonResultPageResultPodcastCategoryRespVO</h2>

<a id="schemacommonresultpageresultpodcastcategoryrespvo"></a> <a id="schema_CommonResultPageResultPodcastCategoryRespVO"></a> <a id="tocScommonresultpageresultpodcastcategoryrespvo"></a> <a id="tocscommonresultpageresultpodcastcategoryrespvo"></a>

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "id": "19919",
        "podcastCategoryName": "王五",
        "pid": "27218",
        "sort": 0,
        "domain": "string",
        "createTime": "2019-08-24T14:15:22Z"
      }
    ],
    "total": 0
  },
  "msg": "string"
}
```

### 属性

| 名称 | 类型 | 必选 | 约束 | 中文名 | 说明 |
| --- | --- | --- | --- | --- | --- |
| code | integer(int32) | false | none |  | none |
| data | [PageResultPodcastCategoryRespVO](#schemapageresultpodcastcategoryrespvo) | false | none |  | 分页结果 |
| msg | string | false | none |  | none |

<h2 id="tocS_PageResultPodcastCategoryRespVO">PageResultPodcastCategoryRespVO</h2>

<a id="schemapageresultpodcastcategoryrespvo"></a> <a id="schema_PageResultPodcastCategoryRespVO"></a> <a id="tocSpageresultpodcastcategoryrespvo"></a> <a id="tocspageresultpodcastcategoryrespvo"></a>

```json
{
  "list": [
    {
      "id": "19919",
      "podcastCategoryName": "王五",
      "pid": "27218",
      "sort": 0,
      "domain": "string",
      "createTime": "2019-08-24T14:15:22Z"
    }
  ],
  "total": 0
}
```

分页结果

### 属性

| 名称 | 类型 | 必选 | 约束 | 中文名 | 说明 |
| --- | --- | --- | --- | --- | --- |
| list | [[PodcastCategoryRespVO](#schemapodcastcategoryrespvo)] | true | none |  | 数据 |
| total | integer(int64) | true | none |  | 总量 |

<h2 id="tocS_CommonResultPodcastCategoryRespVO">CommonResultPodcastCategoryRespVO</h2>

<a id="schemacommonresultpodcastcategoryrespvo"></a> <a id="schema_CommonResultPodcastCategoryRespVO"></a> <a id="tocScommonresultpodcastcategoryrespvo"></a> <a id="tocscommonresultpodcastcategoryrespvo"></a>

```json
{
  "code": 0,
  "data": {
    "id": "19919",
    "podcastCategoryName": "王五",
    "pid": "27218",
    "sort": 0,
    "domain": "string",
    "createTime": "2019-08-24T14:15:22Z"
  },
  "msg": "string"
}
```

### 属性

| 名称 | 类型 | 必选 | 约束 | 中文名 | 说明 |
| --- | --- | --- | --- | --- | --- |
| code | integer(int32) | false | none |  | none |
| data | [PodcastCategoryRespVO](#schemapodcastcategoryrespvo) | false | none |  | 管理后台 - 平台播客分类 Response VO |
| msg | string | false | none |  | none |

<h2 id="tocS_CommonResultPageResultPodcastCategoryRecommendRespVO">CommonResultPageResultPodcastCategoryRecommendRespVO</h2>

<a id="schemacommonresultpageresultpodcastcategoryrecommendrespvo"></a> <a id="schema_CommonResultPageResultPodcastCategoryRecommendRespVO"></a> <a id="tocScommonresultpageresultpodcastcategoryrecommendrespvo"></a> <a id="tocscommonresultpageresultpodcastcategoryrecommendrespvo"></a>

```json
{
  "code": 0,
  "data": {
    "list": [
      {
        "id": "16416",
        "categoryId": "24043",
        "grade": "string",
        "createTime": "2019-08-24T14:15:22Z"
      }
    ],
    "total": 0
  },
  "msg": "string"
}
```

### 属性

| 名称 | 类型 | 必选 | 约束 | 中文名 | 说明 |
| --- | --- | --- | --- | --- | --- |
| code | integer(int32) | false | none |  | none |
| data | [PageResultPodcastCategoryRecommendRespVO](#schemapageresultpodcastcategoryrecommendrespvo) | false | none |  | 分页结果 |
| msg | string | false | none |  | none |

<h2 id="tocS_PageResultPodcastCategoryRecommendRespVO">PageResultPodcastCategoryRecommendRespVO</h2>

<a id="schemapageresultpodcastcategoryrecommendrespvo"></a> <a id="schema_PageResultPodcastCategoryRecommendRespVO"></a> <a id="tocSpageresultpodcastcategoryrecommendrespvo"></a> <a id="tocspageresultpodcastcategoryrecommendrespvo"></a>

```json
{
  "list": [
    {
      "id": "16416",
      "categoryId": "24043",
      "grade": "string",
      "createTime": "2019-08-24T14:15:22Z"
    }
  ],
  "total": 0
}
```

分页结果

### 属性

| 名称 | 类型 | 必选 | 约束 | 中文名 | 说明 |
| --- | --- | --- | --- | --- | --- |
| list | [[PodcastCategoryRecommendRespVO](#schemapodcastcategoryrecommendrespvo)] | true | none |  | 数据 |
| total | integer(int64) | true | none |  | 总量 |

<h2 id="tocS_PodcastCategoryRecommendRespVO">PodcastCategoryRecommendRespVO</h2>

<a id="schemapodcastcategoryrecommendrespvo"></a> <a id="schema_PodcastCategoryRecommendRespVO"></a> <a id="tocSpodcastcategoryrecommendrespvo"></a> <a id="tocspodcastcategoryrecommendrespvo"></a>

```json
{
  "id": "16416",
  "categoryId": "24043",
  "grade": "string",
  "createTime": "2019-08-24T14:15:22Z"
}
```

管理后台 - 平台播客分类推荐 Response VO

### 属性

| 名称       | 类型              | 必选 | 约束 | 中文名 | 说明           |
| ---------- | ----------------- | ---- | ---- | ------ | -------------- |
| id         | string            | true | none |        | id             |
| categoryId | string            | true | none |        | 平台播客分类id |
| grade      | string            | true | none |        | 推荐年级       |
| createTime | string(date-time) | true | none |        | 创建时间       |

<h2 id="tocS_CommonResultPodcastCategoryRecommendRespVO">CommonResultPodcastCategoryRecommendRespVO</h2>

<a id="schemacommonresultpodcastcategoryrecommendrespvo"></a> <a id="schema_CommonResultPodcastCategoryRecommendRespVO"></a> <a id="tocScommonresultpodcastcategoryrecommendrespvo"></a> <a id="tocscommonresultpodcastcategoryrecommendrespvo"></a>

```json
{
  "code": 0,
  "data": {
    "id": "16416",
    "categoryId": "24043",
    "grade": "string",
    "createTime": "2019-08-24T14:15:22Z"
  },
  "msg": "string"
}
```

### 属性

| 名称 | 类型 | 必选 | 约束 | 中文名 | 说明 |
| --- | --- | --- | --- | --- | --- |
| code | integer(int32) | false | none |  | none |
| data | [PodcastCategoryRecommendRespVO](#schemapodcastcategoryrecommendrespvo) | false | none |  | 管理后台 - 平台播客分类推荐 Response VO |
| msg | string | false | none |  | none |
