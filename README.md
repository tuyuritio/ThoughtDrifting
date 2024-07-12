# Blog

个人博客。

## 安装

### 配置 MongoDB

> 安装：https://www.mongodb.com/docs/manual/installation/

### 配置环境变量

在 `.env.local` 中添加以下变量：

```sh
DATABASE_URL=       # 精确到数据库名，mongodb://<username>:<password>@<host>:<port>/<database>
BLOG_ASSET_PATH=    # 资源相对路径
BLOG_VISIT_KEY=     # 用于生成 Cookie
```

### 编译

```sh
npm install
npm run build
```

### pm2 托管

```sh
sudo npm install --global pm2
PORT=<PORT> pm2 start build/index.js --name Blog
pm2 startup
pm2 save
```

### Nginx 代理

```conf
server {
    server_name <HOSTNAME>;

    location / {
        proxy_pass http://localhost:<PORT>;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```
