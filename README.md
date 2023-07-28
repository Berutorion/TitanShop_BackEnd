
# Titan_Backend

**前端Github Repository網址：** [titan_shop_front_end](https://github.com/Berutorion/titan_shop_front_end/blob/master/README.md)

## 安裝

Node.js 版本建議為：`v14.16.0` 以上...

### 取得專案

```bash
git clone https://github.com/Berutorion/TitanShop_BackEnd.git
```

### 移動到專案內

```bash
cd Titan_BackEnd
```

### 安裝套件

```bash
npm install
```

### 環境變數設定

新增名為.env的檔案加入以下內容
```
PORT=
NODE_ENV=
CORS_ORIGIN_OPTION=
JWT_SECRET=

DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
DB_HOST=
```

### 資料庫初始化

```bash 
npm run dbInit
```

### 運行專案

```bash
npm run start
```

## 專案技術

- Node.js v16.15.0
- express v4.18.2
- sequelize v6.27.0
- jsonwebtoken v8.5.1
- passport v0.6.0


