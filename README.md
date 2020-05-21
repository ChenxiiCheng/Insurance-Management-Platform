# Insurance Company Official Website

> Insurance Purchase Platform

[Purchase Platform | Deploy on Tencent Shanghai Cloud Server](http://172.81.242.65:3000/#/login) | Website Link | Access a little bit slow

[Insurance Official Website | Deploy on Netlify](https://insurance.chenxii.xyz) | Website Link

### Preview

Login Page
![image-20191025143441031](./imgs/login.png)

Register Page
![image-20191025143441031](./imgs/register.png)

Admin User Panel | Only Administrator can access this page
![image-20191025143441031](./imgs/admin.png)

User Info Page
![image-20191025143441031](./imgs/customer.png)

Edit Home Insurance Info
![image-20191025143441031](./imgs/home1.png)

Payment
![image-20191025143441031](./imgs/payment.png)

Home Insurance Page
![image-20191025143441031](./imgs/home2.png)

Buy Home Insurance
![image-20191025143441031](./imgs/home3.png)

Auto Insurance Page
![image-20191025143441031](./imgs/auto1.png)

Buy Auto Insurance
![image-20191025143441031](./imgs/auto2.png)

---

### Features

- Login / Register Page
- User password encryption
- Role-based access control
  - Only Administrator can access "Admin User Panel", see all the registered users' information and all users' purchased records, and edit or delete records
  - Customer can only see their information, buy, edit their insurances, and make a payment
- Local cache

---

### Stack | 技术栈

- react
- echarts
- moment
- axios
- sass
- ant design ui
- react-router-dom

---

### Run in local | 本地运行

```
git clone https://github.com/ChenxiiCheng/Management-Platform-Admin.git
cd Management-Platform-Admin
npm install  // Or yarn install
npm run start // Or yarn start
```
