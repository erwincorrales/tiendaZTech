Tienda ZTECH
Nodejs, React, and MySQL integration project made from scratch. It can manage Customers, Products and Invoices. Authentication was made with jwt token and axios response interceptor

CLONE REPOSITORY:
git clone https://github.com/erwincorrales/tiendaZTech.git


CONFIG DEPENDENCIES
npm install
cd/client npm install

TO RUN ON LOCALHOST ON http://localhost:3001
SERVER START: npm run dev 


REACT UI COMMANDS
DEVELOPMENT MODE WILL BE TRIGGERED with this commmand:
cd /client   npm start


API ROUTES CAN BE TESTED ON 
routes/*.rest files


LAST RELEASE GOALS:
Express server, db connection and tables CRUD configuration with external server, db permissions, MYSQL external connections.

Private routes were protected with Authorization Bearer Token headers and Axios common response token interceptors.

UI were developed on React 17.
It static login user-> username: Zabud  passowrd: 1234
Router: react-router-dom using usehistory and history push
Functional Components with useState and useEffect functions

DASHBOARDS:
Products dashboard and CRUD
Customer dashboard


there is a issue that sometimes we have to authenticate again to use API with webpack
List associated items checked in bills are not finished yet

It is posible to create a filter field in order to sort information or find a client by NIT when he start bill.

Client Server archiquecture. UI keeps logic.

Thanks!



