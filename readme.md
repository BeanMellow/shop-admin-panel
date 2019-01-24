# Shop admin panel
### My first project in React. Preview:
https://beanmellow.github.io/shop-admin-panel/

### Features:
* **Material UI Framework**
* **RWD**
* routing (**React Router**)
* **Fetch** current PLN exchange rates from **REST API**
* Add product **form**:
    * **validation**
    * data saved in **Cloud Firestore database**
* All products (**table**):
    * data retrieved from **Cloud Firestore database**
    * **sorting** by any column (**numeric / alphabetic**)
    * **pagination**
    * **edit / delete** product (simultaneously in current component state and database)

### How to install:
1. `git clone https://github.com/BeanMellow/shop-admin-panel`
2. `cd shop-admin-panel`
3. `npm i`

Then `npm start` for development mode, and `npm run build` for production.

In development mode, localhost server will run on `localhost:8080` with autoreloading.
